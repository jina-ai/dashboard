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
  height: 100%;
  padding: 1rem;
  box-shadow: none;
  border: 1px solid ${(props) => props.theme.palette.grey[400]};
`
export const Tag = styled.div`
  background: ${(props) => props.theme.palette.grey[400]};
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
`
const ImageTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  font-family: "Roboto";
`
const ImageLink = styled(Link)`
  color: unset;
  margin-top: 1rem;
  &:hover {
    text-decoration: none;
  }
`
const ImageDescription = styled.p`
  font-weight: 400;
  word-break: break-word;
`

export default function ImageCard({ image, index }: Props) {
  let { name, keywords, kind, description } = image

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
      </ImageCardContainer>
    </ImageLink>
  )
}
