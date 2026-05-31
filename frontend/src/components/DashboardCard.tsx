import { Paper } from "@mui/material";

export default function DashboardCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme => theme.spacing(2),
        padding: theme => theme.spacing(4),
      }}
    >
      {children}
    </Paper>
  );
}