import { SettingsType } from "minesweeper/settings";

export type SettingsProps = {
  settings: SettingsType;
  onSubmit: (settings: SettingsType) => void;
};
