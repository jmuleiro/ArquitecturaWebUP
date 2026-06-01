import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const DeleteButton = ({ disabled, onClick }: { disabled: boolean, onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Delete />}
      disabled={disabled}
      onClick={onClick}>
      Delete
    </Button>
  );
};

export default DeleteButton;
