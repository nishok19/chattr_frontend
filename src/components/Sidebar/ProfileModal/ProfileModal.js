import React, { useState, useEffect } from "react";
import "./ProfileModal.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IconButton } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStateValue } from "../../../StateProvider";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";

const ProfileModal = ({ onSubmit, onDelAcc }) => {
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [isDisabled, setIsDisabled] = useState(true);

  const [userName, setUserName] = useState(user.name);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenConfirm(false);
    setIsDisabled(true);
    setOpenDel(false);
  };

  const handleSubmit = () => {
    setOpenConfirm(true);
  };

  const onConfirmSubmit = () => {
    onSubmit(userName);
    setIsDisabled(true);
    setOpenConfirm(false);
    setOpen(false);
  };

  const delAcc = () => {
    setOpenConfirm(false);
    setOpen(false);
    setOpenDel(false);
    onDelAcc();
  };

  const delAccCancel = () => {
    setOpenConfirm(false);
    setOpenDel(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen} className="sidebar__add__button">
        Profile
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the User name that will be visible to others.
          </DialogContentText>

          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <TextField
                disabled={isDisabled}
                id="name"
                // label="User Name"
                type="text"
                margin="dense"
                fullWidth
                style={{ width: 400 }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => setIsDisabled(!isDisabled)}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          <br />
          <Button
            className="profile__delete__button"
            onClick={() => setOpenDel(true)}
          >
            Delete Account
          </Button>
          <DialogContentText>
            This will delete your account completely.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Name Confirm Dialog */}
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to change the user name.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmSubmit} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* User Name Confirm Dialog End */}

      {/* Delete Account Confirm Dialog */}
      <Dialog
        open={openDel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete the current account?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delAcc} color="primary">
            Confirm
          </Button>
          <Button onClick={delAccCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Account Confirm Dialog End */}
    </div>
  );
};

export default ProfileModal;
