/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react"
import { PageTitle } from "../Common/PageTitle"
import SpinningLoader from "../Common/SpinningLoader"

const MiscPage = () => {
  const { palette } = useTheme()
  return (
    <div>
      <PageTitle title={"Misc"} className={""} />
      <span
        css={css`
          color: ${palette.headerTextColor};
          padding: 8px;
        `}
      >
        Loading Spinner
      </span>
      <SpinningLoader />
    </div>
  )
}

export default MiscPage
