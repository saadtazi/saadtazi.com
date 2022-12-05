import { SettingsType } from "minesweeper/settings";

const defaultSettings = {
  nbColumns: 6,
  nbRows: 6,
  nbMines: 3,
};

export function fetchSettings(): SettingsType {
  if (typeof window === "undefined") {
    return defaultSettings;
  }
  const settingsString = window.localStorage.getItem("settings");
  if (!settingsString) {
    return defaultSettings;
  }
  try {
    return JSON.parse(settingsString);
  } catch (e) {
    return defaultSettings;
  }
}

export function saveSettings(settings: SettingsType) {
  window?.localStorage.setItem("settings", JSON.stringify(settings));
}
