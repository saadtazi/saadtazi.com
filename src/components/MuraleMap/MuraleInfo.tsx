import React from "react";
import { StyledMuraleInfo, StyledMuraleInfoCard } from "./MuraleInfo.styles";
import { Murale } from "types/models";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import useTranslate from "hooks/translate";

type Props = {
  murale: Murale;
};

export const MuraleInfo: React.FC<Props> = (props) => {
  const { image, artist, address, borough, year } = props.murale;

  return (
    <StyledMuraleInfo>
      {image && (
        <div className="image">
          <img src={image} alt={image} />
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
                {t("murales.by", undefined, { artist })}
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
