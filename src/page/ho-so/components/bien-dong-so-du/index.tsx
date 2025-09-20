import { USER_INFO } from "@/contants/contants";
import { safeParseJSON } from "@/helpers";
import { queryGetListNotification } from "@/services/graphql/notification-gql";
import { TYPE_NOTIFICATION } from "@/services/model/loans";
import { User } from "@/services/model/user";
import { useSubscription } from "@apollo/client";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";

interface ResponseNotifications {
  id: number;
  createdAt: string;
  content: string;
  type: number;
  user: UserRes;
  notifications_notification_config: NotificationsNotificationConfig;
}

interface UserRes {
  loans: Loan[];
}

interface Loan {
  otp_logs: OtpLog[];
}

interface OtpLog {
  otpcode: string;
  is_expired: boolean;
}

interface NotificationsNotificationConfig {
  title: string;
  code: string;
  color: string;
}

export default function AccountHistorySection({ user }: { user: User }) {
  const [filter, setFilter] = useState("all");
  const userInfo = safeParseJSON(
    (Cookies.get(USER_INFO) || "") as string
  ) as User;

  const { data: listNotification } = useSubscription(queryGetListNotification, {
    variables: {
      user_id: userInfo?.id,
      type: TYPE_NOTIFICATION.SYSTEM,
    },
  });

  function extractOTP(content: string): string | null {
    const match = content.match(/\d{6}/); // tìm chuỗi 6 chữ số
    return match ? match[0] : null;
  }

  function removeOTP(content: string): string {
    return content.replace(/\d{6}/, "").trim(); // xóa OTP khỏi chuỗi
  }

  return (
    <Box className="space-y-6 max-w-4xl">
      <Paper className="!rounded-[10px] overflow-hidden">
        <Box className="bg-[#2c3763] text-white px-4 py-2 flex justify-between items-center">
          <Typography fontWeight="bold">Thông báo</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-lg">Tiêu đề</TableCell>
              <TableCell className="font-bold text-lg">Nội dung</TableCell>
              <TableCell className="font-bold text-lg">
                Ngày thông báo
              </TableCell>
              <TableCell className="font-bold text-lg">Tình trạng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listNotification?.notifications.length > 0 ? (
              listNotification.notifications.map(
                (notification: ResponseNotifications) => {
                  console.log(
                    notification.user?.loans?.[0]?.otp_logs[0]?.is_expired
                  );

                  return (
                    <TableRow key={notification.id}>
                      {/* Cột Tiêu đề */}
                      <TableCell style={{ fontWeight: "bold" }}>
                        {notification.notifications_notification_config.title}
                      </TableCell>

                      {/* Cột Nội dung */}
                      <TableCell>
                        {removeOTP(notification.content)}{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {extractOTP(notification.content)}
                        </span>
                      </TableCell>

                      {/* Cột Ngày thông báo */}
                      <TableCell>
                        {(() => {
                          const d = new Date(notification.createdAt);
                          const date = d.toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          });
                          return <>{date}</>;
                        })()}
                      </TableCell>

                      {/* Cột Hạn sử dụng */}
                      <TableCell>
                        {notification.user?.loans?.flatMap((loan) =>
                          loan.otp_logs
                            .filter((item) =>
                              notification.content.includes(item?.otpcode)
                            )
                            .map((item, index) => (
                              <div key={index}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    color: item.is_expired ? "red" : "green",
                                  }}
                                >
                                  {item.is_expired
                                    ? "Đã sử dụng"
                                    : "Chưa sử dụng"}
                                </span>
                              </div>
                            ))
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography fontSize={14}>Không có thông báo nào</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Paper className="!rounded-[10px] overflow-hidden ">
        <Box className="bg-[#2c3763] text-white px-4 py-2 flex justify-between items-center">
          <Typography fontWeight="bold">Lịch sử biến động tài khoản</Typography>
          <Select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              minWidth: 160,
              height: 32,
              fontSize: 14,
            }}
          >
            <MenuItem value="all">Tất cả giao dịch</MenuItem>
            <MenuItem value="in">Giao dịch vào</MenuItem>
            <MenuItem value="out">Giao dịch ra</MenuItem>
          </Select>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-sm">Mã GD</TableCell>
              <TableCell className="font-bold text-sm">
                Ngày giao dịch
              </TableCell>
              <TableCell className="font-bold text-sm">Số tiền</TableCell>
              <TableCell className="font-bold text-sm">Loại</TableCell>
              <TableCell className="font-bold text-sm">Ghi chú</TableCell>
              <TableCell className="font-bold text-sm">
                Người thực hiện
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography align="center" fontSize={14}>
                  Không có giao dịch nào
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Paper className="rounded-xl overflow-hidden">
        <Box className="bg-[#2c3763] text-white px-4 py-2">
          <Typography fontWeight="bold">Lịch thanh toán sắp tới</Typography>
        </Box>
        <Box p={2}>
          <Alert severity="info" className="bg-[#d4f1fa] text-[#0c5460]">
            Bạn chưa có khoản thanh toán nào sắp tới.
          </Alert>
        </Box>
      </Paper>
    </Box>
  );
}
