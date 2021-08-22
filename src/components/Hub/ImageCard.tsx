import React from "react"
import { Card } from "@material-ui/core"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { capitalizeFirstLetter } from "../../helpers/format"

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
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background-color: ${(props) => props.theme.palette.background.default};
`
type TagProps = {
  filterColorIndex: number
}
export const Tag = styled.div<TagProps>`
  ${({ filterColorIndex, theme }) => {
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
const ImageTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  font-family: "Roboto";
  margin-bottom: 0.75rem;
`
const ImageLink = styled(Link)`
  color: unset;
  margin-top: 1rem;
  &:hover {
    text-decoration: none;
  }
`
const ImageDescription = styled.p`
  font-family: "Roboto";
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.palette.grey[700]};
  word-break: break-word;
`

export default function ImageCard({ image, index }: Props) {
  let { name, keywords, kind, description } = image

  return (
    <ImageLink to={`/package/${kind}/${index}`}>
      <ImageCardContainer data-name="hubImage">
        <ImageTitle>{name}</ImageTitle>
        {keywords.map((keyword, index) => (
          <Tag data-name="hubImageTags" key={index} filterColorIndex={index}>
            {capitalizeFirstLetter(keyword)}
          </Tag>
        ))}
        <ImageDescription>{description}</ImageDescription>
      </ImageCardContainer>
    </ImageLink>
  )
}
