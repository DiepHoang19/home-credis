import { formatNumber, maskFirstThreeDigits } from "@/helpers";
import { setIsShow } from "@/redux/slices/toggleBoxChat";
import { Loan } from "@/services/model/loans";
import { User } from "@/services/model/user";
import { Person } from "@mui/icons-material";
import { Paper, Typography, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

export const InfoUser = ({
  user,
  setSelected,
  loanCurrent,
}: {
  user: User;
  setSelected: (value: number) => void;
  loanCurrent: Loan;
}) => {
  const numberBank = maskFirstThreeDigits(user?.accountnumber || "000");
  const dispatch = useDispatch();
  return (
    <Box className="flex-1 max-w-4xl space-y-4">
      <Paper className="p-4 shadow-md !rounded-[10px]">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          className="bg-[#26314f] text-white px-4 py-2 !rounded-[10px] flex items-stretch"
        >
          <Person className="mr-1" /> Thông Tin Cá Nhân
        </Typography>
        <Box className="grid grid-cols-2 gap-4 p-4 ">
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
          <Field label="Giới tính" value={user?.gender === 0 ? "Nam" : "Nữ"} />
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
            { label: "Mục đích vay", value: loanCurrent?.purpose || "" },
          ],
        },
        {
          title: "Thông Tin Người Thân",
          data: [
            { label: "Người thân 1", value: user?.relatives?.[0].relationship },
            { label: "Số điện thoại", value: user?.relatives?.[0].phone },
            { label: "Người thân 2", value: user?.relatives?.[1].relationship },
            { label: "Số điện thoại", value: user?.relatives?.[1].phone },
          ],
        },
        {
          title: "Thông Tin Ngân Hàng",
          data: [
            { label: "Tên ngân hàng", value: user?.bankname },
            { label: "Số tài khoản", value: numberBank },
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
                <Button
                  size="small"
                  variant="text"
                  color="primary"
                  onClick={() => setSelected(4)}
                >
                  Thay đổi mật khẩu & Cài đặt bảo mật
                </Button>
              ),
            },
          ],
        },
      ].map((section, index) => (
        <Paper className="p-4 shadow-md !rounded-[10px]" key={index}>
          <Box className="flex-1 max-w-4xl space-y-4">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              className="bg-[#26314f] text-white px-4 py-2  !rounded-[10px]"
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
                  Nếu bạn muốn thay đổi thông tin cá nhân, vui lòng liên hệ với
                  tổng đài hỗ trợ
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => dispatch(setIsShow(true))}
                >
                  Liên hệ hỗ trợ
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

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
