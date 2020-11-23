// import styled from 'styled-components';
import { useWindowSize } from 'react-use';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import useTranslate from 'hooks/translate';
import { StyledRandomItem } from './RandomStuff.styles';
import Tooltip from '@material-ui/core/Tooltip';

const Motion = () => {
  const t = useTranslate();
  const { width, height } = useWindowSize();

  // return <>{JSON.stringify(windowSize)}</>;
  return (
    <StyledRandomItem>
      <div className="icon">
        <AspectRatioIcon />
      </div>
      <div className="info">
        <Tooltip placement="right" title={t('windowSize.widthAndHeight')}>
          <div className="angle">
            {width} x {height}
          </div>
        </Tooltip>
      </div>
    </StyledRandomItem>
  );
};

export default Motion;
