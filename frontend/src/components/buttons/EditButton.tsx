import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";

const EditButton = ({ disabled, onClick }: { disabled: boolean, onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Edit />}
      disabled={disabled}
      onClick={onClick}>
      Edit
    </Button>
  );
};

export default EditButton;
