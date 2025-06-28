import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { ControllerRenderProps } from "react-hook-form";
import { BankForm } from "@/page/xac-nhan-khoan-vay/components/StepFour";

export interface Bank {
  id: number;
  code: string;
  shortName: string;
  name: string;
  logo: string;
}

interface Props {
  field: ControllerRenderProps<BankForm, "bankname">;
}

export default function BankSelect({ field }: Props) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.vietqr.io/v2/banks");
        if (res.data?.data) {
          setBanks(res.data.data);
        }
      } catch (err) {
        console.error("Fetch banks failed", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    <Box className="flex justify-center py-4">
      <CircularProgress size={24} />
    </Box>;
  }
  return (
    <Select
      {...field}
      //   displayEmpty
      renderValue={(selected) => {
        const bank = banks.find((b) => b.shortName === selected);
        return bank ? (
          <Box className="flex items-center gap-2">
            <img
              src={bank.logo}
              alt={bank.shortName}
              className="w-12 h-6 object-contain"
            />
            <Typography>{`${bank.shortName} - ${bank.name}`}</Typography>
          </Box>
        ) : undefined;
      }}
      label="Ngân hàng *"
    >
      <MenuItem value="">
        <Typography color="textSecondary">Chưa chọn ngân hàng</Typography>
      </MenuItem>
      {banks.map((b) => (
        <MenuItem key={b.id} value={b.shortName}>
          <Box className="flex items-center gap-2">
            <img
              src={b.logo}
              alt={b.shortName}
              className="w-12 h-6 object-contain"
            />
            <Typography>{`${b.shortName} - ${b.name}`}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
