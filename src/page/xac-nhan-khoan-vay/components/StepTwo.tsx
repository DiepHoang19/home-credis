import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { useRef, useState } from "react";
import uploadServices from "@/services/upload.service";

interface Props {
  setActiveStep: (value: number) => void;
  cccdStep: number;
  setCccdStep: (value: number) => void;
}

export default function StepTwo(props: Props) {
  const { setActiveStep, cccdStep, setCccdStep } = props;

  const [info, setInfo] = useState({
    cccd_before: "",
    cccd_after: "",
    avatar: "",
  });
  const [loadingUpload, setLoadingUpload] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingUpload(true);
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const res = await uploadServices.uploadImage(formData);

      let field = "";
      if (cccdStep === 0) field = "cccd_before";
      else if (cccdStep === 1) field = "cccd_after";
      else field = "avatar";

      setInfo({
        ...info,
        [field]: res.data.url,
      });
    } catch (error) {}

    setActiveStep(1);
    setLoadingUpload(false);
  };

  const getImageField = () => {
    if (cccdStep === 0) return "cccd_before";
    if (cccdStep === 1) return "cccd_after";
    return "avatar";
  };

  const handleRemoveImage = () => {
    const field = getImageField();
    setInfo({
      ...info,
      [field]: "",
    });
  };

  const currentImage = info[getImageField() as keyof typeof info];

  const onSubmit = () => {
    if (cccdStep === 0 && info.cccd_before) {
      setCccdStep(1);
    }
    if (cccdStep === 1 && info.cccd_after) {
      setCccdStep(2);
    }

    if (cccdStep === 2 && info.avatar) {
      setActiveStep(2);
    }
  };

  const renderInputUpload = () => {
    if (loadingUpload) {
      return (
        <Box
          sx={{
            display: "block",
            maxWidth: 600,
            mx: "auto",
            my: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "2px dashed #ccc",
          }}
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ mx: "auto" }}
          />
          <Skeleton height={20} width="60%" sx={{ mx: "auto", mt: 2 }} />
          <Skeleton height={14} width="40%" sx={{ mx: "auto", mb: 2 }} />

          <Divider sx={{ my: 2 }} />

          <Paper
            sx={{
              backgroundColor: "#fff7e6",
              p: 2,
              textAlign: "left",
            }}
            variant="outlined"
          >
            <Skeleton height={20} width="50%" sx={{ mb: 1 }} />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height={16} width="90%" sx={{ mb: 1 }} />
            ))}
          </Paper>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "block",
          cursor: "pointer",
          maxWidth: 600,
          mx: "auto",
          my: 4,
          p: 3,
          borderRadius: 2,
          // boxShadow: 1,
          backgroundColor: "#fff",
          border: "2px dashed #ccc",
          textAlign: "center",
          "&:hover": {
            borderColor: "#1976d2",
            backgroundColor: "#f9f9f9",
          },
        }}
        component="label"
        htmlFor="upload-cccd"
      >
        <input
          id="upload-cccd"
          type="file"
          hidden
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          ref={inputRef}
        />
        <PhotoCamera fontSize="large" color="primary" />

        <Typography mt={1} fontSize={14}>
          Nhấp vào đây để tải lên ảnh CMND/CCCD mặt trước
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Định dạng: JPG, PNG. Kích thước tối đa: 5MB
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Paper
          sx={{ backgroundColor: "#fff7e6", p: 2, textAlign: "left" }}
          variant="outlined"
        >
          <Typography fontWeight="bold" fontSize={14} mb={1}>
            Lưu ý khi chụp:
          </Typography>
          <List dense disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Chụp với ánh sáng đầy đủ, không bị lóa"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Đảm bảo tất cả thông tin và số CMND/CCCD rõ ràng"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Chụp đủ 4 góc giấy tờ"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Không chụp trực tiếp màn hình"
                primaryTypographyProps={{ fontSize: 13 }}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "block",
        width: "80vw",
        maxWidth: 600,
        mx: "auto",
        my: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="primary"
        mb={2}
        textAlign="center"
      >
        {cccdStep === 0 && "UPLOAD CMND/CCCD MẶT TRƯỚC"}
        {cccdStep === 1 && "UPLOAD CMND/CCCD MẶT SAU"}
        {cccdStep === 2 && "UPLOAD ẢNH CHÂN DUNG"}
      </Typography>
      {currentImage ? (
        <Box display="flex" justifyContent="center">
          <img
            src={currentImage}
            alt="preview"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
          <Button
            size="small"
            color="error"
            onClick={handleRemoveImage}
            sx={{
              ml: 1,
              backgroundColor: "white",
              border: "1px solid #f44336",
              "&:hover": {
                backgroundColor: "#ffe6e6",
              },
              height: 25,
            }}
          >
            <Typography fontSize={12}>Xóa</Typography>
          </Button>
        </Box>
      ) : (
        renderInputUpload()
      )}
      <Box textAlign="center" mt={3}>
        <Button variant="contained" size="large" onClick={onSubmit}>
          TIẾP TỤC
        </Button>
      </Box>
    </Box>
  );
}
