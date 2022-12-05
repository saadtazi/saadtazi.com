import React from "react";
import { useMotion } from "react-use";
import SpeedIcon from "@mui/icons-material/Speed";
import { StyledRandomItem } from "./RandomStuff.styles";
import Tooltip from "@mui/material/Tooltip";
import useTranslate from "hooks/translate";

const Motion = () => {
  const t = useTranslate();

  const motion = useMotion();

  // return <>{JSON.stringify(motion)}</>;
  const {
    acceleration: { x, y, z },
    rotationRate: { alpha, beta, gamma },
  } = motion;
  return (
    <StyledRandomItem>
      <div className="icon">
        <SpeedIcon />
      </div>
      <div className="info">
        <Tooltip placement="right" title={t("motion.acceleration")}>
          <div className="acceration-values">
            ({x || 0}, {y || 0}, {z || 0})
          </div>
        </Tooltip>
        <Tooltip placement="right" title={t("motion.rotationRate")}>
          <div className="rotation-rate-values">
            ({alpha || 0}, {beta || 0}, {gamma || 0})
          </div>
        </Tooltip>
      </div>
    </StyledRandomItem>
  );
};

export default Motion;
