import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={onClick}
    >
      New
    </Button>
  );
};

export default AddButton;
