import React from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  Skeleton,
} from "@mui/material";

export default function PersonalInfoPanelSkeleton() {
  return (
    <Box className="flex" sx={{ maxWidth: "1280px", mx: "auto", mt: 4 }}>
      {/* Sidebar Skeleton */}
      <Box
        sx={{
          width: 250,
          backgroundColor: "#fff",
          borderRight: "1px solid #e5e5e5",
          p: 2,
          flexShrink: 0,
        }}
      >
        <Box textAlign="center" mb={2}>
          <Skeleton
            variant="circular"
            width={80}
            height={80}
            sx={{ mx: "auto" }}
          />
          <Skeleton width={120} height={24} sx={{ mt: 1, mx: "auto" }} />
          <Skeleton width={100} height={18} sx={{ mt: 0.5, mx: "auto" }} />
        </Box>

        <Box>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              height={40}
              sx={{ mb: 1 }}
              variant="rectangular"
            />
          ))}
        </Box>
      </Box>

      {/* Content Skeleton */}
      <Box flex={1} p={2}>
        {[...Array(4)].map((_, index) => (
          <Paper sx={{ borderRadius: 2, mb: 2 }} key={index}>
            <Box
              px={3}
              py={2}
              bgcolor="#1e2b50"
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Skeleton variant="text" width={200} height={24} />
            </Box>
            <Box p={3} className="flex flex-wrap gap-y-4">
              {[...Array(4)].map((__, idx) => (
                <Box key={idx} className="w-full sm:w-1/2" mb={1} pr={2}>
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="80%" height={26} />
                </Box>
              ))}
              {index === 3 && (
                <Box className="w-full text-center mt-4">
                  <Skeleton width="70%" height={20} sx={{ mx: "auto" }} />
                  <Skeleton
                    width={150}
                    height={36}
                    sx={{ mt: 2, mx: "auto" }}
                  />
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
