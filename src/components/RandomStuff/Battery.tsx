// import styled from 'styled-components';
import { useBattery } from "react-use";
import styled from "styled-components";
import BatteryUnknownIcon from "@mui/icons-material/BatteryUnknown";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Tooltip from "@mui/material/Tooltip";
import useTranslate from "hooks/translate";
import { StyledRandomItem } from "./RandomStuff.styles";

const Battery = () => {
  const t = useTranslate();
  const batteryState = useBattery();

  if (!batteryState.isSupported) {
    return (
      <div>
        <BatteryUnknownIcon />
      </div>
    );
  }

  if (!batteryState.fetched) {
    return <div>...</div>;
  }
  const chargeLevel = (batteryState.level * 100).toFixed(0);
  const { charging, chargingTime, dischargingTime } = batteryState;
  return (
    <StyledRandomItem>
      <div className="icon">
        {charging ? <BatteryChargingFullIcon /> : <BatteryFullIcon />}
      </div>
      <div className="info">
        <Tooltip placement="right" title={t("battery.chargeLevel")}>
          <div className="charge-level">{chargeLevel}%</div>
        </Tooltip>
        <Tooltip placement="right" title={t("battery.chargingTime")}>
          <div className="charging-time">
            {chargingTime === Infinity ? "N/A" : chargingTime}
          </div>
        </Tooltip>
        <Tooltip placement="right" title={t("battery.dischargingTime")}>
          <div className="discharging-time">
            {dischargingTime === Infinity ? "N/A" : dischargingTime}
          </div>
        </Tooltip>
      </div>
    </StyledRandomItem>
  );
};

export default Battery;
