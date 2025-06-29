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

// export const ChatMessage: React.FC = () => {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const userInfo = safeParseJSON(
//     (Cookies.get(USER_INFO) || "") as string
//   ) as User;

//   const { data: dataRoom, refetch } = useQuery<{ room_chat: { id: string }[] }>(
//     GET_ROOM_CHAT,
//     {
//       variables: { user_id: userInfo?.id },
//       skip: !userInfo?.id,
//     }
//   );
//   const userInfo = safeParseJSON(
//     (Cookies.get(USER_INFO) || "") as string
//   ) as User;
//   const { data: dataAdmins } = useQuery<{ users: { id: number }[] }>(
//     GET_ADMIN_BY_CODE_ROLE
//   );

//   const { data: dataChat } = useSubscription<{ message_chat: IChatMessage[] }>(
//     GET_CHAT,
//     {
//       variables: { room_chat_id: dataRoom?.room_chat?.[0]?.id },
//       skip: !dataRoom?.room_chat?.[0]?.id,
//     }
//   );

//   const [createRoom] = useMutation(CREATE_ROOM, {
//     fetchPolicy: "network-only",
//     notifyOnNetworkStatusChange: true,
//   });

//   const [createChat] = useMutation(CREATE_CHAT, {
//     fetchPolicy: "network-only",
//     notifyOnNetworkStatusChange: true,
//   });

//   const handleChat = async () => {
//     if (loading) return;
//     try {
//       if (!userInfo?.id) {
//         toast.warning("Hãy đăng nhập tài khoản");
//         return;
//       }
//       setLoading(true);

//       let room_chat_id = dataRoom?.room_chat?.[0]?.id;
//       if (!room_chat_id) {
//         const rs = await createRoom({
//           variables: {
//             user_id: userInfo?.id,
//             admin_id: dataAdmins?.users?.[0].id,
//           },
//         });
//         room_chat_id = rs.data.insert_room_chat.returning?.[0]?.id;
//         refetch();
//       }
//       if (!room_chat_id) {
//         setLoading(false);
//         toast.warning("Không tìm thấy phòng chat");
//         return;
//       }

//       if (!message?.trim()) {
//         setLoading(false);
//         return;
//       }
//       await createChat({
//         variables: {
//           send_id: userInfo?.id,
//           message: message,
//           room_chat_id: room_chat_id,
//           reply_id: dataAdmins?.users?.[0].id,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       toast.warning("Đã có lỗi xảy ra khi chat");
//     }

//     setLoading(false);

//     setMessage("");
//   };

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const isShow = useSelector((state: any) => state.toggleBoxChat.isShow);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
//     }
//   }, [dataChat?.message_chat?.length]);

//   if (!isShow)
//     return (
//       <div className=" fixed bottom-17 right-2 md:right-4 z-999999  w-[38px] h-[38px]">
//         <Tooltip title="Trao đổi với quản trị viên">
//           <img
//             src="/iconchat.png"
//             alt=""
//             onClick={() => dispatch(setIsShow(true))}
//             className="cursor-pointer"
//           />
//         </Tooltip>
//       </div>
//     );

//   return (
//     <div className=" fixed bottom-0 right-0 md:right-2  z-999999">
//       <div className="min-w-full md:max-w-4xl mx-auto md:!w-[400px] !w-[100vw]">
//         <div className="rounded-xl shadow bg-white">
//           <div className="flex justify-between items-center px-6 py-4 border-b border-b-gray-100">
//             <h2 className="text-xl font-semibold text-black">Chat</h2>
//             <button
//               className=" text-black px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition cursor-pointer"
//               onClick={() => dispatch(setIsShow(false))}
//             >
//               <CloseOutlined />
//             </button>
//           </div>

//           <div
//             ref={messagesEndRef}
//             className="h-[70vh] md:h-96 overflow-y-auto p-6 space-y-6"
//           >
//             {dataChat?.message_chat?.map((chat, idx) => {
//               if (chat.send_id === userInfo.id) {
//                 return (
//                   <div className="flex justify-end items-start gap-3" key={idx}>
//                     <div className="flex flex-col items-end text-right">
//                       <div className="bg-blue-600 !text-white rounded-lg px-4 py-2 mb-1">
//                         {chat?.message || ""}
//                       </div>

//                       {/* <div className="text-xs text-gray-500 mt-1">
//                         {convertToHourMinute(chat.created_at)}
//                       </div> */}
//                     </div>
//                     {/* <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                 alt="avatar"
//                 className="w-11 h-11 rounded-full"
//               /> */}
//                   </div>
//                 );
//               }

//               return (
//                 <div className="flex items-start gap-3" key={idx}>
//                   <img
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                     alt="avatar"
//                     className="w-11 h-11 rounded-full"
//                   />
//                   <div>
//                     <div className="bg-gray-200 !text-[#171717] rounded-lg px-4 py-2 mb-1 w-fit">
//                       {chat?.message || ""}
//                     </div>

//                     {/* <div className="text-xs text-gray-500 mt-1">
//                       {convertToHourMinute(chat.created_at)}
//                     </div> */}
//                   </div>
//                 </div>
//               );
//             })}
//             {/* Message from other */}
//             {/* <div className="flex items-start gap-3">
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                 alt="avatar"
//                 className="w-11 h-11 rounded-full"
//               />
//               <div>
//                 <div className="bg-gray-200 rounded-lg px-4 py-2 mb-1 w-fit">
//                   Hi
//                 </div>
//                 <div className="bg-gray-200 rounded-lg px-4 py-2 mb-1 w-fit">
//                   How are you ...???
//                 </div>
//                 <div className="bg-gray-200 rounded-lg px-4 py-2 w-fit">
//                   What are you doing tomorrow? Can we come up a bar?
//                 </div>
//                 <div className="text-xs text-gray-500 mt-1">23:58</div>
//               </div>
//             </div> */}

//             {/* Divider */}
//             {/* <div className="text-center text-sm text-gray-400 relative">
//               <span className="bg-white px-2 z-10 relative">Today</span>
//               <div className="absolute left-0 right-0 top-1/2 border-t border-gray-200 -z-10"></div>
//             </div> */}

//             {/* Message from self */}
//             {/* <div className="flex justify-end items-start gap-3">
//               <div className="flex flex-col items-end text-right">
//                 <div className="bg-blue-600 text-white rounded-lg px-4 py-2 mb-1">
//                   Hiii, I'm good.
//                 </div>
//                 <div className="bg-blue-600 text-white rounded-lg px-4 py-2 mb-1">
//                   How are you doing?
//                 </div>
//                 <div className="bg-blue-600 text-white rounded-lg px-4 py-2 mb-1">
//                   Long time no see! Tomorrow office. will be free on sunday.
//                 </div>
//                 <div className="text-xs text-gray-500 mt-1">00:06</div>
//               </div>
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
//                 alt="avatar"
//                 className="w-11 h-11 rounded-full"
//               />
//             </div> */}
//           </div>

//           {/* Footer */}
//           <div className="border-t px-6 py-4 bg-white border-t-gray-100 md:rounded-b-xl">
//             <div className="flex items-center gap-3">
//               {/* <img
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
//                 alt="avatar"
//                 className="w-11 h-11 rounded-full"
//               /> */}
//               <input
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 className="flex-1 border rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-100"
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !loading) {
//                     handleChat();
//                   }
//                 }}
//                 value={message}
//               />
//               <div className="flex items-center gap-2 text-gray-500">
//                 {/* <PaperClipOutlined className="text-xl cursor-pointer" />
//                 <SmileOutlined className="text-xl cursor-pointer" /> */}

//                 {loading ? (
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                   >
//                     <CircularProgress size={24} sx={{ color: "blue" }} />
//                   </Box>
//                 ) : (
//                   <SendOutlined
//                     className="text-xl cursor-pointer text-blue-600"
//                     onClick={handleChat}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

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
