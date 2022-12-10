import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useTranslate from 'hooks/translate';

type LoseProps = {
  restart: () => void;
};

export function Lose({ restart }: LoseProps) {
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
      <DialogTitle>{t('minesweeper.youLost')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          😭😭😭
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('minesweeper.close')}</Button>
        <Button onClick={restart}>{t('minesweeper.restart')}</Button>
      </DialogActions>
    </Dialog>
  );
}
