import React from "react"
import { Row, Col, Card } from "react-bootstrap"
import styled from "@emotion/styled"
import { Theme, useTheme } from "@emotion/react"
import { Link } from "react-router-dom"

type HubImagePreview = {
  name: string
  author: string
  description: string
  kind: string
  keywords: string[]
}

type Props = {
  image: HubImagePreview
  index: number
}
type TagProps = {
  filterColorIndex: number
  theme: Theme
}
export const Tag = styled.div`
  ${({ theme, filterColorIndex }: TagProps) => {
    const filterPalette = theme.palette.filters

    return `background: ${
      filterPalette[filterColorIndex % filterPalette.length].main
    };
            color: ${
              filterPalette[filterColorIndex % filterPalette.length]
                .contrastText
            };`
  }}
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.35rem 0.75rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
`
const Title = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  line-height: normal;
`

const SubTitle = styled.div`
  font-weight: 600;
  opacity: 0.5;
`

const ImageLink = styled(Link)`
  color: unset;
  &:hover {
    text-decoration: none;
  }
`

export default function ImageCard({ image, index }: Props) {
  let { name, author, keywords, kind, description } = image
  const theme = useTheme()

  return (
    <ImageLink to={`/package/${kind}/${index}`}>
      <Card className="clickable mb-4 h-100 image-card" data-name="hubImage">
        <Card.Body className="pb-0 mb-0 pt-3">
          <Row>
            <Col xs="12" className="px-0">
              <Title className="mb-2">{name}</Title>
              {keywords.map((keyword, index) => (
                <Tag
                  data-name="hubImageTags"
                  key={index}
                  filterColorIndex={index}
                  theme={theme}
                >
                  {keyword}
                </Tag>
              ))}
              <SubTitle data-name="hubImageAuthor" className="mb-2">
                {author}
              </SubTitle>
            </Col>
            <Col sm="12" className="px-0 pb-0">
              <div className="description-container">
                <div className="description-overlay" />
                <div className="app-description">{description}</div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </ImageLink>
  )
}
