import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useTranslate from 'hooks/translate';

type WinProps = {
  restart: () => void;
};

export function Win({ restart }: WinProps) {
  const [open, setOpen] = useState(true);
  const t = useTranslate();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{t('minesweeper.youWon')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          🎉🎉 Yeyyyy! 🎉🎉
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('minesweeper.close')}</Button>
        <Button onClick={restart}>{t('minesweeper.restart')}</Button>
      </DialogActions>
    </Dialog>
  );
}
