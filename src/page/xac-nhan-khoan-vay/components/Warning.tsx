import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  InfoOutlined,
  WarningAmberOutlined,
  Close,
  Visibility,
} from "@mui/icons-material";
import { useRouter } from "@/hook";

export default function LoanAlertSection({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Box className="space-y-4 w-[80vw]">
      {/* Info Alert Box */}
      <Box className="border border-blue-200 bg-blue-50 rounded-md p-4 relative flex items-start gap-3">
        <InfoOutlined className="text-blue-600 mt-0.5" />
        <Box className="flex-1">
          <Typography fontWeight={600} className="text-blue-600">
            Khoản vay đang xử lý
          </Typography>
          <Typography fontSize={14}>
            Bạn có khoản vay đang <strong>Chờ xử lý</strong>. Đơn đăng ký của
            bạn đã được gửi và đang chờ xử lý.
          </Typography>
        </Box>
        <Box className="absolute top-4 right-4 flex items-center gap-2">
          <Button
            size="small"
            startIcon={<Visibility />}
            variant="outlined"
            color="inherit"
            className="!text-gray-700 !border-gray-300"
            onClick={() => router.push("/chi-tiet-khoan-vay?id=" + id)}
          >
            Xem chi tiết
          </Button>
          <IconButton size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Warning Alert Box */}
      <Box className="border border-yellow-300 bg-yellow-50 rounded-md p-4 flex items-start gap-3">
        <WarningAmberOutlined className="text-yellow-700 mt-0.5" />
        <Box>
          <Typography fontWeight={600} className="text-yellow-800">
            Lưu ý:
            <span className="font-normal text-sm ml-1">
              Bạn cần hoàn thành khoản vay đang xử lý trước khi có thể đăng ký
              khoản vay mới.
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
