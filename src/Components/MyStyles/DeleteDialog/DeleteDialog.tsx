import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "./DeleteDialog.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
interface DeleteDialogProps {
  isConfirmationOpen: boolean;
  handleConfirmationClose: () => void;
  updateArray: (newArray: any) => void;
  newArray: any;
  deleteApi: (id: number) => Promise<AxiosResponse<any, any>>;
  dispatchAction: (id: number) => AnyAction;
  title: string;
  content: string;
}
function DeleteDialog({
  isConfirmationOpen,
  handleConfirmationClose,
  updateArray,
  newArray,
  deleteApi,
  dispatchAction,
  title,
  content,
}: DeleteDialogProps): JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const id = useSelector((state: RootState) => state.idReducer.id);
  const [isDeleteMessageDialogOpen, setDeleteMessageDialog] = useState(false);
  const [isErrorMessageDialogOpen, setErrorMessageDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handelDeleteMessageOpen = () => setDeleteMessageDialog(true);
  const handelDeleteMessageClose = () => {
    setDeleteMessageDialog(false);
    updateArray(newArray);
  };

  const handelDelete = () => {
    return deleteApi(id)
      .then(() => {
        dispatch(dispatchAction(id));
        handleConfirmationClose();
        handelDeleteMessageOpen();
      })
      .catch((err) => {
        handleConfirmationClose();
        setErrorMessage(
          err?.response ? err.response.data.description : "Something went wrong"
        );
        handleErrorMessage();
      });
  };

  const handleErrorMessage = () =>
    setErrorMessageDialog(!isErrorMessageDialogOpen);

  return (
    <div className="DeleteDialog">
      <Dialog
        open={isConfirmationOpen}
        className={`ConfirmationDialog ${theme}`}
        onClose={handleConfirmationClose}
      >
        <DialogTitle>Deleting {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            You are about to delete this {title}, are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialogButtons">
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handelDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <SuccessDialog
        isDeleteMessageDialogOpen={isDeleteMessageDialogOpen}
        handelDeleteMessageClose={handelDeleteMessageClose}
        content={content}
      />

      <Dialog
        open={isErrorMessageDialogOpen}
        onClose={handleErrorMessage}
        className="errorDelete"
      >
        <div className="iconBox">
          <div className="checkIcon">
            <IoIosCloseCircleOutline size={56} />
          </div>
        </div>
        <DialogTitle>Oops!</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions className="dialogButtons">
          <Button onClick={handleErrorMessage}>Go back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
