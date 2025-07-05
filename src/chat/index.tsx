import { USER_INFO } from "@/contants/contants";
import { safeParseJSON } from "@/helpers";
import {
  GET_ROOM_CHAT,
  GET_CHAT,
  CREATE_ROOM,
  CREATE_CHAT,
} from "@/services/graphql/chat-gql";
import { User } from "@/services/model/user";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { CloseOutlined, SendOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setIsShow } from "@/redux/slices/toggleBoxChat";
import { IChatMessage } from "@/services/model/chat";
import { GET_ADMIN_BY_CODE_ROLE } from "@/services/graphql/user-gql";
import {
  MessageList,
  Message,
  ChatContainer,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import uploadServices from "@/services/upload.service";
import parse from "html-react-parser";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

export function convertToHourMinute(datetime: string): string {
  const date = new Date(datetime); // đã tự động về local time (UTC+7 nếu bạn ở VN)

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export const ChatMessage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const userInfo = safeParseJSON(
    (Cookies.get(USER_INFO) || "") as string
  ) as User;
  const { data: dataAdmins } = useQuery<{ users: { id: number }[] }>(
    GET_ADMIN_BY_CODE_ROLE
  );

  const { data: dataRoom, refetch } = useQuery<{ room_chat: { id: string }[] }>(
    GET_ROOM_CHAT,
    {
      variables: { user_id: userInfo?.id },
      skip: !userInfo?.id,
    }
  );

  const { data: dataChat } = useSubscription<{ message_chat: IChatMessage[] }>(
    GET_CHAT,
    {
      variables: { room_chat_id: dataRoom?.room_chat?.[0]?.id },
      skip: !dataRoom?.room_chat?.[0]?.id,
    }
  );

  const [createRoom] = useMutation(CREATE_ROOM);

  const [createChatMessage] = useMutation(CREATE_CHAT);

  const handleChat = async (values: string) => {
    if (loading) return;
    try {
      if (!userInfo?.id) {
        toast.warning(
          "Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục sử dụng tính năng này."
        );
        return;
      }
      setLoading(true);
      // nếu chưa có phòng chat  thì tạo phòng mới
      let room_id = dataRoom?.room_chat?.[0]?.id;
      if (!room_id) {
        const rs = await createRoom({
          variables: {
            user_id: userInfo?.id,
            admin_id: dataAdmins?.users?.[0].id,
          },
        });
        room_id = rs.data.insert_room_chat.returning?.[0]?.id;

        refetch();
      }
      if (!room_id) {
        setLoading(false);
        toast.warning("Không tìm thấy phòng chat");
        return;
      }

      // gửi tin nhắn
      await createChatMessage({
        variables: {
          send_id: userInfo?.id,
          message: values.trim(),
          room_chat_id: room_id,
          reply_id: dataAdmins?.users?.[0].id,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.warning("Đã có lỗi xảy ra khi chat");
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef: any = useRef(null);
  const isShow = useSelector((state: any) => state.toggleBoxChat.isShow);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [dataChat?.message_chat?.length]);

  if (!isShow)
    return (
      <div className=" fixed bottom-17 right-2 md:right-4 z-999999  w-[38px] h-[38px]">
        <Tooltip title="Trao đổi với quản trị viên">
          <img
            src="/iconchat.png"
            alt=""
            onClick={() => dispatch(setIsShow(true))}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>
    );

  const handleOpenFile = () => {
    inputRef?.current?.click();
  };

  const handleUploadFile = async (event: any) => {
    const file = event?.target?.files[0];
    const formData = new FormData();
    formData.append("image", file);
    // nếu chưa có phòng chat  thì tạo phòng mới
    let room_id = dataRoom?.room_chat?.[0]?.id;
    if (!room_id) {
      const rs = await createRoom({
        variables: {
          user_id: userInfo?.id,
          admin_id: dataAdmins?.users?.[0].id,
        },
      });
      room_id = rs.data.insert_room_chat.returning?.[0]?.id;

      refetch();
    }
    if (!room_id) {
      setLoading(false);
      toast.warning("Không tìm thấy phòng chat");
      return;
    }

    try {
      const response = await uploadServices.uploadImage(formData);
      await createChatMessage({
        variables: {
          send_id: userInfo?.id,
          message: `<img src="${response.data.imageUrl}" alt="image" style="max-width:200px;border-radius:8px" />`,
          room_chat_id: room_id,
          reply_id: dataAdmins?.users?.[0].id,
        },
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 md:right-2  z-999999">
      <div className="min-w-full md:max-w-4xl mx-auto md:!w-[400px] !w-[100vw]">
        <div className="rounded-xl shadow bg-white">
          <div className="flex justify-between items-center px-6 py-4 border-b border-b-gray-100">
            <h2 className="text-xl font-semibold text-black">
              Hỗ trợ trực tuyến
            </h2>
            <button
              className=" text-black p-2 rounded-full text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => dispatch(setIsShow(false))}
            >
              <CloseOutlined />
            </button>
          </div>

          <div
            ref={messagesEndRef}
            className="h-[70vh] md:h-96 overflow-y-hidden p-6 space-y-6"
          >
            <ChatContainer>
              <MessageList>
                {dataChat?.message_chat?.map((itemMessage: any) => {
                  const direction =
                    itemMessage.send_id === userInfo?.id
                      ? "outgoing"
                      : "incoming";

                  return (
                    <Message
                      key={itemMessage.id}
                      style={{ marginTop: 20 }}
                      model={{
                        direction,
                        position: "normal",
                        sentTime: itemMessage.created_at,
                        message: itemMessage.message,
                      }}
                    >
                      {parse(itemMessage.message)}
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Nhập tin nhắn..."
                attachButton
                onSend={handleChat}
                sendButton
                onAttachClick={handleOpenFile}
              />
            </ChatContainer>
            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleUploadFile}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
