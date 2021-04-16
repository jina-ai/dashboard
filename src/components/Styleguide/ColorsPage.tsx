/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react"
import { PageTitle } from "../Common/PageTitle"

const ColorsPage = () => {
  const { palette } = useTheme()
  return (
    <div>
      <PageTitle title={"Colors"} className={""} />
      {Object.keys(palette).map((color) => (
        <div
          key={color}
          css={css`
            padding: 32px;
            background-color: ${palette[color as keyof typeof palette]};
          `}
        >
          <span
            css={css`
              background-color: ${palette.tagBackground};
              color: ${palette.headerTextColor};
              padding: 8px;
              border-radius: 8px;
            `}
          >
            {color} {palette[color as keyof typeof palette]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ColorsPage
