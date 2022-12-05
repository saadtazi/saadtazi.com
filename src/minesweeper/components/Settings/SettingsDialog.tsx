import { useState, forwardRef, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import { SettingsProps } from './types';

import styled from '@emotion/styled';
import useTranslate from 'hooks/translate';

const FieldContainer = styled.div`
  padding: 1em 0;
`;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function SettingsDialog({
  settings: { nbRows, nbColumns, nbMines },
  onSubmit,
}: SettingsProps) {
  const [open, setOpen] = useState(false);
  const [nbRowsValue, setNbRowsValue] = useState(nbRows);
  const [nbColumnsValue, setNbColumnsValue] = useState(nbColumns);
  const [nbMinesValue, setNbMinesValue] = useState(nbMines);
  const t = useTranslate();

  const onSave = (evt: FormEvent) => {
    evt.preventDefault();
    onSubmit({
      nbRows: nbRowsValue,
      nbColumns: nbColumnsValue,
      nbMines: nbMinesValue,
    });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t('minesweeper.settings')}...
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> {t('minesweeper.settings')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ marginTop: '1em' }} onSubmit={onSave}>
            <FieldContainer>
              <TextField
                label={t('minesweeper.nbCols')}
                onChange={(evt) =>
                  setNbColumnsValue(parseInt(evt.currentTarget.value, 10))
                }
                inputProps={{ type: 'number', min: 1 }}
                value={nbColumnsValue}
              />
            </FieldContainer>
            <FieldContainer>
              <TextField
                label={t('minesweeper.nbRows')}
                onChange={(evt) =>
                  setNbRowsValue(parseInt(evt.currentTarget.value, 10))
                }
                inputProps={{ type: 'number', min: 1 }}
                value={nbRowsValue}
              />
            </FieldContainer>
            <FieldContainer>
              <TextField
                label={t('minesweeper.nbMines')}
                onChange={(evt) =>
                  setNbMinesValue(parseInt(evt.currentTarget.value, 10))
                }
                inputProps={{
                  type: 'number',
                  min: 1,
                  // max: nbColumnsValue * nbRowsValue,
                }}
                value={nbMinesValue}
              />
            </FieldContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={onSave}>{t('minesweeper.saveAndRestart')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
