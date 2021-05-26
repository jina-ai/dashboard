import { Theme } from "@emotion/react"
import { Level } from "../../redux/logStream/logStream.types"

export type LevelColor = {
  borderColor: string
  backgroundColor: string
}

type LevelColors = {
  [level in Level]: LevelColor
}

export const getLevelPalette = (theme: Theme): LevelColors => {
  const colorPalette = theme.palette
  return {
    INFO: {
      borderColor: colorPalette.info.main,
      backgroundColor: "rgba(0, 153, 153, 0.9)",
    },
    SUCCESS: {
      borderColor: colorPalette.success.main,
      backgroundColor: "rgba(50, 200, 205, 0.9)",
    },
    WARNING: {
      borderColor: colorPalette.warning.main,
      backgroundColor: "rgba(255, 204, 102, 0.9)",
    },
    ERROR: {
      borderColor: colorPalette.error.main,
      backgroundColor: "rgba(255, 102, 102, 0.9)",
    },
    CRITICAL: {
      borderColor: colorPalette.warning.dark,
      backgroundColor: "rgba(255, 70, 64, 0.9)",
    },
    DEBUG: {
      borderColor: colorPalette.grey[700],
      backgroundColor: "rgba(110, 114, 120, 0.9)",
    },
  }
}
