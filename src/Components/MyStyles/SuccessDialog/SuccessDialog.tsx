import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import "./SuccessDialog.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
interface SuccessDialogProps {
  isDeleteMessageDialogOpen: boolean;
  handelDeleteMessageClose: () => void;
  content: string;
}
function SuccessDialog({
  isDeleteMessageDialogOpen,
  handelDeleteMessageClose,
  content,
}: SuccessDialogProps): JSX.Element {
  return (
    <Dialog
      open={isDeleteMessageDialogOpen}
      onClose={handelDeleteMessageClose}
      className="SuccessDialog"
      style={{ backdropFilter: "blur(15px)" }}
      disablePortal
    >
      <div className="iconBox">
        <div className="checkIcon">
          <IoIosCheckmarkCircleOutline size={56} />
        </div>
      </div>
      <DialogTitle>{content}</DialogTitle>
      <DialogActions className="dialogButtons">
        <Button onClick={handelDeleteMessageClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;
