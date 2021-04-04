import React from "react"
import { Row, Col, Card } from "react-bootstrap"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

type HubImagePreview = {
  name: string
  author: string
  description: string
  keywords: string[]
}

type Props = {
  image: HubImagePreview
  index: number
}

export const Tag = styled.div`
  background: ${(props) => props.theme.palette.tagBackground};
  border-radius: 6px;
  display: inline-block;
  padding: 0.25rem;
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
  let { name, author, keywords, description } = image

  return (
    <ImageLink to={`/package/${index}`}>
      <Card className="clickable mb-4 h-100 image-card" data-name="hubImage">
        <Card.Body className="pb-0 mb-0 pt-3">
          <Row>
            <Col xs="12" className="px-0">
              <Title className="mb-2">{name}</Title>
              {keywords.map((keyword, index) => (
                <Tag data-name="hubImageTags" key={index}>
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
