import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useTranslate from 'hooks/translate';
import { Type, detectType, processValue } from './process-value';
import { ValueError } from './DiffApp.styles';
import { useRouter } from 'next/router';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import debounce from 'lodash/debounce';

const getFirstValue = (value: string[] | string | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

export const DiffApp = () => {
  const t = useTranslate();

  const router = useRouter();

  const [left, setLeft] = useState<string>('');
  const [right, setRight] = useState<string>('');
  const [inputType, setInputType] = useState<string>('auto');
  const [splitView, setSplitView] = useState<boolean>(true);
  const [canCopyUrl, setCanCopyUrl] = useState<boolean>(true);

  useEffect(() => {
    const { query } = router;

    const newLeft = getFirstValue(query.left);
    if (newLeft) {
      setLeft(newLeft);
    }

    const newRight = getFirstValue(query.right);
    if (newRight) {
      setRight(newRight);
    }

    const newType = getFirstValue(query.type);
    if (newType) {
      setInputType(newType);
    }
  }, [router, setLeft, setRight, setInputType]);

  const debouncedUpdateUrl = useMemo(
    () =>
      debounce((inputType: string | undefined, left: string, right: string) => {
        if (left.length + right.length < 5000) {
          setCanCopyUrl(true);
          router.push({
            query: { type: inputType, left, right },
          });
        } else {
          setCanCopyUrl(false);
          router.push({ query: {} });
        }
      }, 400),
    [router, setCanCopyUrl]
  );

  const copyUrl = useCallback(() => {
    if (canCopyUrl) {
      navigator.clipboard.writeText(document.location.href);
    } else {
      const url = new URL(document.location.href);
      url.searchParams.set('type', inputType);
      url.searchParams.set('left', left);
      url.searchParams.set('right', right);
      console.log(url.toString());
      navigator.clipboard.writeText(url.toString());
    }
  }, [canCopyUrl, inputType, left, right]);

  const usedType =
    inputType === Type.Auto ? detectType(left, right) : inputType;

  const [processedLeft, leftError] = processValue(left, usedType);
  const [processedRight, rightError] = processValue(right, usedType);

  return (
    <Grid container spacing={2}>
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        justifyContent="center"
        display="flex"
      >
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <TextField
              id="left-part"
              label={t('diffTools.enterText')}
              multiline
              minRows={4}
              maxRows={25}
              value={left}
              variant="filled"
              onChange={(e) => {
                const leftValue = e.target.value;
                debouncedUpdateUrl(inputType, leftValue, right);

                setLeft(leftValue);
              }}
            />
          </FormControl>
        </Grid>
        {leftError && (
          <Grid size={{ xs: 12 }}>
            <ValueError>{leftError.message}</ValueError>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        size={{ xs: 12, md: 6 }}
        justifyContent="center"
        display="flex"
      >
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <TextField
              id="left-part"
              label={t('diffTools.enterText')}
              multiline
              minRows={4}
              maxRows={25}
              value={right}
              variant="filled"
              onChange={(e) => {
                const rightValue = e.target.value;
                debouncedUpdateUrl(inputType, left, rightValue);
                setRight(rightValue);
              }}
            />
          </FormControl>
        </Grid>
        {rightError && (
          <Grid size={{ xs: 12 }}>
            <ValueError>{rightError.message}</ValueError>
          </Grid>
        )}
      </Grid>
      <Grid container size={{ xs: 12 }} justifyContent="center" display="flex">
        <Grid size={{ xs: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="input-type">{t('diffTools.inputType')}</InputLabel>
            <Select
              labelId="input-type"
              id="input-type"
              value={inputType}
              label={t('diffTools.inputType')}
              onChange={(evt) => {
                const newType = evt.target.value;
                debouncedUpdateUrl(newType, left, right);
                setInputType(newType);
              }}
            >
              <MenuItem value={Type.Auto}>
                {t('diffTools.autoType')} <sup>*</sup>
              </MenuItem>
              <MenuItem value={Type.String}>
                {t('diffTools.stringType')}
              </MenuItem>
              <MenuItem value={Type.Json}>{t('diffTools.jsonType')}</MenuItem>
              <MenuItem value={Type.Url}>{t('diffTools.urlType')}</MenuItem>
              <MenuItem value={Type.QueryString}>
                {t('diffTools.queryStringType')}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} container>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              value="top"
              control={
                <Switch
                  checked={splitView}
                  onChange={(event) => setSplitView(event.target.checked)}
                />
              }
              label={t('diffTools.splitView')}
              labelPlacement="start"
            />
          </Grid>
          {usedType !== inputType && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="caption" gutterBottom>
                * using type {usedType}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container size={{ xs: 12 }} justifyContent="center" display="flex">
        <Grid size={{ xs: 12 }}>
          <ReactDiffViewer
            oldValue={processedLeft}
            newValue={processedRight}
            splitView={splitView}
          />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <IconButton
          aria-label={t('diffTools.copyUrl')}
          disabled={!canCopyUrl}
          title={t('diffTools.copyUrl')}
          onClick={copyUrl}
        >
          <LinkIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
