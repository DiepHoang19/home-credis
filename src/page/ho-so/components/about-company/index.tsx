import { Box, Typography, Button, Paper } from "@mui/material";
import { Email, LocationOn, Phone } from "@mui/icons-material";

export default function ContactUsSection() {
  return (
    <Box className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Banner Contact Us */}
      <Paper
        elevation={2}
        className="relative overflow-hidden  !rounded-[10px]"
      >
        <img
          src="https://via.placeholder.com/800x180?text=CONTACT+US"
          alt="Contact Banner"
          className="w-full object-cover h-44"
        />
        <Box className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-black/30">
          <Box className="text-center space-y-2">
            <Typography variant="h4" fontWeight="bold">
              CONTACT US
            </Typography>
            <Box className="flex justify-center space-x-6">
              <Phone />
              <Email />
              <LocationOn />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Button */}
      <Box className="text-center">
        <Button variant="contained" color="primary">
          LIÊN HỆ CHĂM SÓC KHÁCH HÀNG
        </Button>
      </Box>

      {/* Company Info */}
      <Paper elevation={1} className="p-4 space-y-2">
        <Typography fontWeight="bold">
          CÔNG TY TÀI CHÍNH HomeCRD VIỆT NAM
        </Typography>
        <Typography>
          MAIL: <span className="text-red-500 font-medium">hd@gmail.com</span>
        </Typography>
        <Typography>
          HOTLINE: <span className="text-red-500 font-medium">123</span>
        </Typography>
        <Typography className="text-red-600 font-bold text-sm">
          CÙNG HomeCRD MANG ƯỚC MƠ VỀ NHÀ!
        </Typography>
      </Paper>

      {/* Map Section */}
      <Paper elevation={1} className="rounded-md overflow-hidden">
        <Box className="bg-[#2d3b6f] text-white px-4 py-2 font-semibold flex items-center gap-2">
          🗺️ Bản Đồ
        </Box>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.139273710725!2d106.66428527587091!3d10.800440958750702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752930ce3795bb%3A0xf49e2052ff0efc84!2zQ-G6p3AgVG_DoGkgU-G7kSAoSMOyYSBbaSBUaOG7jSBI4bqhbSwgVEjhuqFuaCBwaOG6p24gU2FpU29uXQ!5e0!3m2!1svi!2s!4v1719386886797!5m2!1svi!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </Paper>
    </Box>
  );
}
