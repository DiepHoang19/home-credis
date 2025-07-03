import { Bank } from "@/components/bank/SelectBank";
import { User } from "@/services/model/user";
import { Box, Typography, Paper, TextField, Alert } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function BankAccountInfoSection({ user }: { user: User }) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [myBank, setMyBank] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.vietqr.io/v2/banks");
        if (res.data?.data) {
          // setBanks(res.data.data);
          const data = (res.data?.data as Bank[]).find(
            (i) => i.shortName === user?.bankname
          );
          setMyBank(data.shortName + " - " + data.name);
        }
      } catch (err) {
        console.error("Fetch banks failed", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Paper className="shadow-md  !rounded-[10px] p-4 space-y-6">
      {/* Bank Card */}
      <Box className="flex justify-center">
        <Box
          className="w-[340px] h-[200px] rounded-xl text-white p-6 relative shadow-lg"
          sx={{
            background: "linear-gradient(135deg, #004e92, #000428)",
          }}
        >
          <Typography fontSize={22} fontWeight="bold" letterSpacing={2} pt={3}>
            {user?.accountnumber}
          </Typography>

          <Box className="absolute top-4 left-4 w-6 h-6 bg-yellow-400 rounded-sm" />

          <Typography fontSize={12} mt={6} color="rgba(255,255,255,0.7)">
            CHỦ THẺ
          </Typography>
          <Typography fontWeight="bold" fontSize={16}>
            {user?.accountname?.toUpperCase()}
          </Typography>

          <Typography
            fontSize={12}
            color="rgba(255,255,255,0.7)"
            className="absolute bottom-6 right-6"
          >
            HIỆU LỰC <br /> <span className="text-white font-bold">12/28</span>
          </Typography>

          <Typography
            className="absolute top-4 right-6 text-white font-semibold"
            fontSize={14}
          >
            {user.bankname}
          </Typography>
        </Box>
      </Box>

      <Typography align="center" fontSize={14} color="textSecondary">
        Thông tin tài khoản ngân hàng đã được lưu
      </Typography>

      {/* Info Section */}
      <Box className="bg-[#2c3763] text-white rounded-t-md px-4 py-2">
        <Typography fontWeight="bold">Thông tin tài khoản ngân hàng</Typography>
      </Box>

      <Alert severity="success" className="!mt-0">
        Thông tin ngân hàng của bạn đã được lưu và không thể chỉnh sửa. Khoản
        vay của bạn sẽ được giải ngân vào tài khoản này.
      </Alert>

      <Box className="grid sm:grid-cols-2 gap-4 px-1">
        <TextField
          label="Số tài khoản / thẻ ATM"
          value={user?.accountnumber}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Tên tài khoản"
          value={user.accountname}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Ngân hàng"
          value={myBank || user.bankname}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>
    </Paper>
  );
}
