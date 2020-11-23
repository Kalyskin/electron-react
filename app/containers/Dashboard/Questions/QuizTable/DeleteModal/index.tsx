import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  open: boolean;
}

export function DeleteModal({ onClose, onDelete, open }: DeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Удаление</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы уверены, что удалите этот вопрос?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onDelete} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
