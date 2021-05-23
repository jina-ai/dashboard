import React from "react"
import Card from "@material-ui/core/Card"
import styled from "@emotion/styled"
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

const ImageCardContainer = styled(Card)`
  padding: 1rem;
  box-shadow: none;
  border: 1px solid ${(props) => props.theme.palette.tagBackground};
`
export const Tag = styled.div`
  background: ${(props) => props.theme.palette.tagBackground};
  border-radius: 6px;
  display: inline-block;
  padding: 0.25rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
`
const ImageTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
`
const SubTitle = styled.div`
  font-weight: 600;
  opacity: 0.5;
`
const ImageLink = styled(Link)`
  display: flex;
  color: unset;
  width: 30%;
  margin-top: 1rem;
  &:hover {
    text-decoration: none;
  }
`
const ImageDescription = styled.p`
  font-weight: 400;
`

export default function ImageCard({ image, index }: Props) {
  let { name, author, keywords, kind, description } = image

  return (
    <ImageLink to={`/package/${kind}/${index}`}>
      <ImageCardContainer data-name="hubImage">
        <ImageTitle>{name}</ImageTitle>
        {keywords.map((keyword, index) => (
          <Tag data-name="hubImageTags" key={index}>
            {keyword}
          </Tag>
        ))}
        <ImageDescription>{description}</ImageDescription>
        <SubTitle data-name="hubImageAuthor" className="mb-2">
          {author}
        </SubTitle>
      </ImageCardContainer>
    </ImageLink>
  )
}
