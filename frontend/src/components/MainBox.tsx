import { Box } from "@mui/material";

export default function MainBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: '100px',
        pb: 6,
      }}
    >
      {children}
    </Box>
  );
}