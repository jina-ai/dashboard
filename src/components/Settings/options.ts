import { SettingName } from "../../redux/settings/settings.types";

type LabelName =
  | "Host"
  | "Log"
  | "Profile"
  | "YAML"
  | "Shutdown"
  | "Ready"
  | "Port";

type Option = {
  label: LabelName;
  placeholder: string;
  value: SettingName;
};

export const baseOptions: Option[] = [
  {
    label: "Host",
    placeholder: "0.0.0.0",
    value: "host",
  },
  {
    label: "Port",
    placeholder: "5000",
    value: "port",
  },
];

export const advancedOptions: Option[] = [
  {
    label: "Log",
    placeholder: "/stream/log",
    value: "log",
  },
  {
    label: "Profile",
    placeholder: "/stream/profile",
    value: "profile",
  },
  {
    label: "YAML",
    placeholder: "/data/yaml",
    value: "yaml",
  },
  {
    label: "Shutdown",
    placeholder: "/action/shutdown",
    value: "shutdown",
  },
  {
    label: "Ready",
    placeholder: "/status/isready",
    value: "ready",
  },
];
