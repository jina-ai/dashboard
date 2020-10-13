import React from "react";
import { useTheme } from "emotion-theming";

type Props = { y: number; x: number; width: number; height: number };

function Bar({ x, y, height, width }: Props) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();

  return <rect y={y} x={x} height={height} width={width} fill={main} />;
}
export { Bar };
