import {
  Box,
  Skeleton,
  Typography,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const LoanDetailSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        mt: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      {/* Sidebar Skeleton */}
      <Box
        sx={{
          width: isMobile ? "100%" : 250,
          backgroundColor: "#f9f9f9",
          textAlign: "center",
          py: 3,
          borderRight: isMobile ? "none" : "1px solid #e0e0e0",
        }}
      >
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{ mx: "auto", mb: 1 }}
        />
        <Skeleton width="60%" sx={{ mx: "auto", mb: 1 }} />
        <Skeleton width="50%" sx={{ mx: "auto", mb: 2 }} />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={30}
          sx={{ mx: "auto", mt: 3, borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={36}
          sx={{ mx: "auto", mt: 2, borderRadius: 1 }}
        />
      </Box>

      {/* Right Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Skeleton width="40%" height={30} sx={{ mb: 2 }} />
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            rowGap={2}
            columnGap={2}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} width="100%" height={24} />
            ))}
          </Box>
          <Box textAlign="center" mt={3}>
            <Skeleton
              variant="rectangular"
              width={180}
              height={40}
              sx={{ mx: "auto", borderRadius: 1 }}
            />
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Skeleton width="50%" height={30} sx={{ mb: 2 }} />
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
          >
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ flex: 1, borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ flex: 1, borderRadius: 1 }}
            />
          </Box>
        </Paper>

        <Box textAlign="center" mt={3}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={40}
            sx={{ mx: "auto", borderRadius: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDetailSkeleton;
