import React from 'react';
import { StyledMuraleInfo, StyledMuraleInfoCard } from './MuraleInfo.styles';
import { Murale } from 'types/models';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Button } from '@material-ui/core';
import useTranslate from 'hooks/translate';

type Props = {
  murale: Murale;
};

export const MuraleInfo: React.FC<Props> = (props) => {
  const { image, artist, address, borough, year } = props.murale;

  return (
    <StyledMuraleInfo>
      {image && (
        <div className="image">
          <img src={image} />
        </div>
      )}
      {artist && <div className="artist">{artist}</div>}
      {address && <div className="address">{address}</div>}
      {borough && <div className="borough">{borough}</div>}
      {year && <div className="year">{year}</div>}
    </StyledMuraleInfo>
  );
};

type MuraleInfoCard = Props & {
  onClose: () => void;
};

export const MuraleInfoCard: React.FC<MuraleInfoCard> = ({
  murale,
  onClose,
}) => {
  const { image, artist, address, borough, year } = murale;
  const t = useTranslate();

  return (
    <StyledMuraleInfoCard>
      <Card>
        <CardActionArea>
          <CardContent>
            {image && (
              <div className="image">
                <img src={image} />
              </div>
            )}
            {artist && (
              <Typography variant="body2" component="p">
                {t('murales.by', undefined, { artist })}
              </Typography>
            )}
            {address && (
              <Typography variant="body2" component="p">
                {address}
              </Typography>
            )}
            {borough && (
              <Typography variant="body2" component="p">
                {borough}
              </Typography>
            )}
            {year && (
              <Typography variant="body2" component="p">
                {year}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={onClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </StyledMuraleInfoCard>
  );
};
