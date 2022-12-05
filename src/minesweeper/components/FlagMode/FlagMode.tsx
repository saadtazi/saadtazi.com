import styled from '@emotion/styled';
import useTranslate from 'hooks/translate';
import HelpIcon from '@mui/icons-material/HelpOutline';
import { Tooltip } from '@mui/material';

const Flag = styled.span`
  cursor: pointer;
  background-color: ${(props: { flagMode: boolean }) => {
    return props.flagMode ? 'grey' : 'lightGrey';
  }};
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
      <Flag flagMode={flagMode} onClick={toggle} title={title}>
        ⛳️
      </Flag>
      <Tooltip title={title}>
        <HelpIcon style={{ verticalAlign: 'bottom' }} />
      </Tooltip>
    </div>
  );
}
