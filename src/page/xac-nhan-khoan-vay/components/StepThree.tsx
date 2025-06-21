
        import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function StepThree() {
  const [gender, setGender] = useState("");

  return (
    <Box   sx={{
        display: "block",
        width: "50vw",
        mx: "auto",
        my: 4,
        p: 3,
        backgroundColor: "#fff",
      }}
      >
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderLeft: "4px solid #0066b3"}} >
        <Typography fontWeight="bold" mb={1} color="#0066b3">
          Thông tin khoản vay đã chọn
        </Typography>
        <div className="flex justify-between">
            <div>
            <Typography variant="body2" className="flex justify-between">Sản phẩm: <strong>Tiền mặt</strong></Typography>
        <Typography variant="body2" className="flex justify-between">Số tiền vay: <strong>150.000.000 VND</strong></Typography>
        </div>
       <div>
         <Typography variant="body2" className="flex justify-between">Thời hạn vay: <strong>6 tháng</strong></Typography>
        <Typography variant="body2" className="flex justify-between">Mã khoản vay: <strong>HD00002528</strong></Typography>
       </div>
        </div>
      </Paper>
      
    <Paper elevation={1} sx={{ p: 2, mb: 3 }} >
      

      <Box>
        <Typography fontWeight="bold" mb={3} color="#0066b3" borderBottom="1px solid #DEE2E6" pb={2}>
          Thông tin cơ bản
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <TextField fullWidth required label="Họ và tên" />
          <TextField fullWidth required label="Số CMND / CCCD" />
        </Box>
        <Box display="flex" gap={2} mb={2}>
          <TextField fullWidth required label="Điện thoại di động" defaultValue="0989803541" />
          <TextField fullWidth required label="Ngày tháng năm sinh" />
        </Box>
        <FormControl fullWidth required>
          <InputLabel>Giới tính</InputLabel>
          <Select
            label="Giới tính"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Typography fontWeight="bold" mb={3} color="#0066b3" borderBottom="1px solid #DEE2E6" pb={2}>
          Thông tin nghề nghiệp
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <TextField fullWidth required label="Nghề nghiệp" />
          <TextField fullWidth required label="Khoản thu nhập" />
        </Box>
        <Box display="flex" gap={2}>
          <TextField fullWidth required label="Mục đích vay" />
          <TextField fullWidth required label="Địa chỉ" />
        </Box>
      </Box>

      <Box mt={4}>
        <Typography fontWeight="bold" mb={3} color="#0066b3" borderBottom="1px solid #DEE2E6" pb={2}>
          Thông tin người thân
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <TextField fullWidth required label="SDT người thân 1" />
          <TextField fullWidth required label="Mối quan hệ người thân 1" />
        </Box>
        <Box display="flex" gap={2}>
          <TextField fullWidth label="SDT người thân 2" />
          <TextField fullWidth label="Mối quan hệ người thân 2" />
        </Box>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" size="large">
          HOÀN TẤT ĐĂNG KÝ VAY
        </Button>
      </Box>
    </Paper>
    </Box>
  );
}

