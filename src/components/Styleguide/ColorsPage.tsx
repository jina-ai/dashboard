/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { PageTitle } from "../Common/PageTitle"
import { theme } from "../../theme"

const ColorsPage = () => {
  const { palette } = theme
  const colorCategories = [
    "primary",
    "secondary",
    "background",
    "action",
    "text",
    "error",
    "warning",
    "success",
    "info",
    "grey",
  ]

  const paletteColorFiltered = Object.entries(
    palette
  ).filter(([category, gradiations]) => colorCategories.includes(category))

  return (
    <div>
      <PageTitle title={"Colors"} className={""} />
      {paletteColorFiltered.map(([category, gradiations]) => {
        return (
          <div>
            <h3>{category}</h3>
            {Object.entries(gradiations).map(([gradiation, color]) => (
              <div
                key={color as string}
                css={css`
                  padding: 32px;
                  background-color: ${color as string};
                `}
              >
                <span
                  css={css`
                    background-color: ${palette.grey[400]};
                    color: ${palette.text.primary};
                    padding: 8px;
                    border-radius: 8px;
                  `}
                >
                  {gradiation}
                </span>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default ColorsPage
