/** @jsx jsx */
import { jsx } from "@emotion/react"
import { PageTitle } from "../Common/PageTitle"
import { Title, Paragraph } from "../Common/Typography"

const TypographyPage = () => {
  return (
    <div>
      <PageTitle title={"Typography"} className={""} />
      <Title> Title </Title>
      <Paragraph>A paragraph that could span over multiple lines</Paragraph>
    </div>
  )
}

export default TypographyPage
