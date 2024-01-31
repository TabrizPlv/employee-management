import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { useDeleteEmployeeMutation } from "../../features/employee/employeeApi";

interface EmpId {
  id: number;
}
const DeleteConfirmation: React.FC<EmpId> = (props) => {
  const [open, setOpen] = useState(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    deleteEmployee(props.id);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} sx={{ gap: "10px" }}>
        <DeleteIcon sx={{ color: "red" }}></DeleteIcon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Current employee's data will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteConfirmation;
