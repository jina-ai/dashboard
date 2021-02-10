/** @jsx jsx */
import React from "react";
import { css, jsx, useTheme } from "@emotion/react";

const Styleguide = () => {
  const { palette } = useTheme();
  return (
    <div>
      Styleguide: colors
      {Object.keys(palette).map((color) => (
        <div
          key={color}
          css={css`
            padding: 32px;
            background-color: ${palette[color as keyof typeof palette]};
            &:hover {
              color: ${color};
            }
          `}
        >
          {color}
        </div>
      ))}
    </div>
  );
};

export { Styleguide };
