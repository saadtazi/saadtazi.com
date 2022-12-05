import React from "react";
import { useOrientation } from "react-use";
import useTranslate from "hooks/translate";
import { StyledRandomItem } from "./RandomStuff.styles";
import PortraitIcon from "@mui/icons-material/Portrait";
import LandscapeIcon from "@mui/icons-material/Landscape";
import Tooltip from "@mui/material/Tooltip";

const Orientation = () => {
  const t = useTranslate();
  const { angle, type } = useOrientation();
  const orientation = type.startsWith("landscape") ? "landscape" : "portait";
  const isPrimary = type.endsWith("primary");

  return (
    <StyledRandomItem>
      <div className="icon">
        <Tooltip placement="right" title={t("orientation.title")}>
          {orientation === "landscape" ? <LandscapeIcon /> : <PortraitIcon />}
        </Tooltip>
      </div>
      <div className="info">
        <Tooltip placement="right" title={t("orientation.angle")}>
          <div className="angle">{angle}%</div>
        </Tooltip>
        <Tooltip placement="right" title={t("orientation.isPrimary")}>
          <div className="orientation-is-primary">
            {isPrimary ? t("orientation.primary") : t("orientation.secondary")}
          </div>
        </Tooltip>
      </div>
    </StyledRandomItem>
  );
};

export default Orientation;
