import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import {
  Person,
  CreditCard,
  AccountBalance,
  Logout,
} from "@mui/icons-material";
import clsx from "clsx";
import { formatNumber, safeParseJSON } from "@/helpers";
import { GET_LOANS_CONFIGS } from "@/services/graphql/loans-config-gql";
import { LoansConfig } from "@/services/model/loansconfig";
import { User } from "@/services/model/user";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { GET_USER } from "@/services/graphql/user-gql";
import dayjs from "dayjs";
import PersonalInfoPanelSkeleton from "./components/SkeletonProfile";
import { User2Icon } from "lucide-react";

const menuItems = [
  { label: "Thông tin cá nhân", icon: <Person /> },
  { label: "Hợp đồng khoản vay", icon: <CreditCard /> },
  { label: "Thông tin ngân hàng", icon: <AccountBalance /> },
  { label: "Đăng xuất", icon: <Logout /> },
];

export default function UserProfileLayout() {
  const [selected, setSelected] = useState("Thông tin cá nhân");
  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;

  const {
    data: dataUser,
    loading: loadingGetUser,
  }: { data: { users: User[] }; loading: boolean } = useQuery(GET_USER, {
    variables: { id: userInfo.id },
    skip: !userInfo.id,
  });

  const user = dataUser?.users?.[0];
  if (loadingGetUser) {
    return <PersonalInfoPanelSkeleton />;
  }
  return (
    <Box className="bg-[#f6f9fb] min-h-screen py-6 px-4">
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        className="text-gray-700 !mb-6"
      >
        THÔNG TIN CÁ NHÂN
      </Typography>
      <Box className="flex justify-center gap-6">
        {/* Sidebar */}
        <Paper elevation={1} className="w-72 p-4">
          <Box className="flex flex-col items-center gap-1 mb-4">
            <Box className="w-16 h-16 rounded-full bg-gray-300" />
            <Typography fontWeight="bold">{user?.full_name || ""}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.phone_number || ""}
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.label}
                // button
                onClick={() => setSelected(item.label)}
                className={clsx(
                  "rounded-lg mb-1 cursor-pointer",
                  selected === item.label
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <ListItemIcon
                  className={clsx(selected === item.label && "text-white")}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Content */}
        <Box className="flex-1 max-w-4xl space-y-4">
          {/* Personal Info */}
          <Paper className="p-4 shadow-md">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              className="bg-[#26314f] text-white px-4 py-2 rounded-t-md flex items-stretch"
            >
              <Person className="mr-1" /> Thông Tin Cá Nhân
            </Typography>
            <Box className="grid grid-cols-2 gap-4 p-4">
              <Field label="Họ và tên" value={user?.full_name || ""} />
              <Field label="Số điện thoại" value={user?.phone_number || ""} />
              <Field label="CMND/CCCD" value={user?.identity_number || ""} />
              <Field
                label="Ngày sinh"
                value={
                  user?.date_of_birth
                    ? dayjs(user.date_of_birth).format("DD/MM/YYYY")
                    : ""
                }
              />
              <Field label="Email" value={user?.email || ""} />
              <Field label="Giới tính" value={user?.gender ? "Nam" : "Nữ"} />
              <Field label="Nghề nghiệp" value={user?.job || ""} />
              <Field label="Địa chỉ" value={user?.address || ""} />
            </Box>
          </Paper>

          {[
            {
              title: "Thông Tin Công Việc",
              data: [
                { label: "Nghề nghiệp", value: user?.job || "" },
                {
                  label: "Thu nhập hàng tháng",
                  value: formatNumber(user?.income || 0),
                },
                { label: "Mục đích vay", value: "" },
              ],
            },
            {
              title: "Thông Tin Người Thân",
              data: [
                { label: "Người thân 1", value: user?.relatives?.[0].name },
                { label: "Số điện thoại", value: user?.relatives?.[0].phone },
              ],
            },
            {
              title: "Thông Tin Ngân Hàng",
              data: [
                { label: "Tên ngân hàng", value: user?.bankname },
                { label: "Số tài khoản", value: user?.accountnumber },
                {
                  label: "Chủ tài khoản",
                  value: user?.accountname,
                },
              ],
            },
            {
              title: "Thông Tin Tài Khoản",
              data: [
                { label: "Tên đăng nhập", value: user?.phone_number },
                {
                  label: "Ngày đăng ký",
                  value: dayjs(user?.createdAt).format("DD/MM/YYYY"),
                },
                {
                  label: "Trạng thái tài khoản",
                  value: (
                    <Typography
                      fontWeight="500"
                      sx={{
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      Đang hoạt động
                    </Typography>
                  ),
                },
                {
                  label: "Quản lý bảo mật",
                  value: (
                    <Button size="small" variant="text" color="primary">
                      Thay đổi mật khẩu & Cài đặt bảo mật
                    </Button>
                  ),
                },
              ],
            },
          ].map((section, index) => (
            <Paper className="p-4 shadow-md" key={index}>
              <Box className="flex-1 max-w-4xl space-y-4">
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  className="bg-[#26314f] text-white px-4 py-2 rounded-t-md"
                >
                  {section.title}
                </Typography>
              </Box>
              <Box p={3} className="flex flex-wrap gap-y-4">
                {section.data.map((item, idx) => (
                  <Box key={idx} className="w-full sm:w-1/2" mb={1} pr={2}>
                    {typeof item.value === "string" ? (
                      <Field label={item.label} value={item.value} />
                    ) : (
                      <>
                        <Typography fontSize={14}>{item.label}</Typography>
                        {item.value}
                      </>
                    )}
                  </Box>
                ))}
                {index === 3 && (
                  <Box className="w-full text-center mt-4">
                    <Typography fontSize={14} color="text.secondary">
                      Nếu bạn muốn thay đổi thông tin cá nhân, vui lòng liên hệ
                      với tổng đài hỗ trợ
                    </Typography>
                    <Button variant="outlined" color="error" sx={{ mt: 2 }}>
                      Liên hệ hỗ trợ
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography fontWeight="500">{value}</Typography>
    </Box>
  );
}
