import Button from '@mui/material/Button';
import {TextField} from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function FormDialog({text, boolean, setBoolean,setObj, children, onClick}: any) {
  const handleClose = () => {
    setObj({})
    setBoolean(false);
  };


  return (
      <Dialog open={boolean} onClose={handleClose}>
        <DialogTitle>{text}</DialogTitle>
        <DialogContent>
        <form id="subscription-form">
        {children}
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClick} type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}
