import styled from '@emotion/styled';
import useTranslate from 'hooks/translate';
import HelpIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from '@mui/material';

const FlagButton = styled.div`
  cursor: pointer;
  display: inline-block;
  padding: 0.6em 1em;
  border-radius: 0.2em;
  box-shadow: 0.2em 0.3em 0.5em rgba(0, 0, 0, 0.35);
  border: 0.1em solid grey;
  ${(props: { flagMode: boolean }) =>
    props.flagMode
      ? `background-color: grey;
    border: 0.1em solid grey;`
      : `background-color: lightGrey;
    border: 0.1em solid grey;`}
`;

type FlagModeProps = {
  flagMode: boolean;
  toggle: () => void;
};

export function FlagMode({ flagMode, toggle }: FlagModeProps) {
  const t = useTranslate();
  const title = flagMode
    ? t('minesweeper.flagbackToNormal')
    : t('minesweeper.clickToAddFlag');
  return (
    <div>
      <FlagButton flagMode={flagMode} onClick={toggle} title={title}>
        ⛳️
      </FlagButton>
      <Tooltip title={title}>
        <HelpIcon style={{ verticalAlign: 'middle', color: 'grey' }} />
      </Tooltip>
    </div>
  );
}
