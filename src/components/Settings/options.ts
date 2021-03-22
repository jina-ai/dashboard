import { SettingName } from "../../redux/settings/settings.types"

type LabelName =
  | "JinaD Host"
  | "JinaD Port"
  | "Gateway Host"
  | "Gateway Port"
  | "Log"
  | "Profile"
  | "YAML"
  | "Shutdown"
  | "Ready"

type Option = {
  label: LabelName
  placeholder: string
  value: SettingName
}

export const baseOptions: Option[] = [
  {
    label: "JinaD Host",
    placeholder: "0.0.0.0",
    value: "jinadHost",
  },
  {
    label: "JinaD Port",
    placeholder: "5000",
    value: "jinadPort",
  },
  {
    label: "Gateway Host",
    placeholder: "0.0.0.0",
    value: "gatewayHost",
  },
  {
    label: "Gateway Port",
    placeholder: "5555",
    value: "gatewayPort",
  },
]

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
]
