import React from "react";
import { useTheme } from "emotion-theming";
import { useSpring, animated } from "react-spring";

type Props = { y: number; x: number; width: number; height: number };

function Bar({ x, y, height, width }: Props) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();
  const props = useSpring({ x, y, height, width });

  return <animated.rect {...props} fill={main} />;
}
export { Bar };
