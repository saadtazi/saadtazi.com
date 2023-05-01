import { useCallback, useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import Grid from '@mui/system/Unstable_Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import useTranslate from 'hooks/translate';
import { MenuItem, Select } from '@mui/material';
import { Type, detectType, processValue } from './process-value';
import { ValueError } from './DiffApp.styles';

export const DiffApp = () => {
  const t = useTranslate();
  const [left, setLeft] = useState<string>('');
  const [right, setRight] = useState<string>('');
  const [inputType, setInputType] = useState<string>('auto');

  const usedType =
    inputType === Type.Auto ? detectType(left, right) : inputType;

  const [processedLeft, leftError] = processValue(left, usedType);
  const [processedRight, rightError] = processValue(right, usedType);

  return (
    <Grid container spacing={2}>
      <Grid container xs={12} md={6} justifyContent="center" display="flex">
        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField
              id="left-part"
              label={t('diffTools.enterText')}
              multiline
              rows={4}
              value={left}
              variant="filled"
              onChange={(e) => setLeft(e.target.value)}
            />
          </FormControl>
        </Grid>
        {leftError && (
          <Grid xs={12}>
            <ValueError>{leftError.message}</ValueError>
          </Grid>
        )}
      </Grid>
      <Grid container xs={12} md={6} justifyContent="center" display="flex">
        <Grid xs={12}>
          <FormControl fullWidth>
            <TextField
              id="left-part"
              label={t('diffTools.enterText')}
              multiline
              rows={4}
              value={right}
              variant="filled"
              onChange={(e) => setRight(e.target.value)}
            />
          </FormControl>
        </Grid>
        {rightError && (
          <Grid xs={12}>
            <ValueError>{rightError.message}</ValueError>
          </Grid>
        )}
      </Grid>
      <Grid xs={12} justifyContent="center" display="flex">
        <FormControl fullWidth>
          <InputLabel id="input-type">{t('diffTools.inputType')}</InputLabel>
          <Select
            labelId="input-type"
            id="input-type"
            value={inputType}
            label={t('diffTools.inputType')}
            onChange={(evt) => setInputType(evt.target.value)}
          >
            <MenuItem value={Type.Auto}>{t('diffTools.autoType')}</MenuItem>
            <MenuItem value={Type.String}>{t('diffTools.stringType')}</MenuItem>
            <MenuItem value={Type.Json}>{t('diffTools.jsonType')}</MenuItem>
            <MenuItem value={Type.Url}>{t('diffTools.urlType')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container xs={12} justifyContent="center" display="flex">
        <Grid xs={12}>
          <ReactDiffViewer
            oldValue={processedLeft}
            newValue={processedRight}
            splitView={true}
          />
        </Grid>
        {usedType !== inputType && <Grid xs={12}>using type {usedType}</Grid>}
      </Grid>
    </Grid>
  );
};
