import { Box } from "@mui/material";

export default function MainBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // background: (theme) =>
        //   theme.palette.mode === 'dark'
        //     ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
        //     : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        pt: '100px',
        pb: 6,
      }}
    >
      {children}
    </Box>
  );
}