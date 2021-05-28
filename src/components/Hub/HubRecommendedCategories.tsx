import React from "react"
import styled from "@emotion/styled"
import {
  TextFields as TextIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
  Audiotrack as AudioIcon,
} from "@material-ui/icons"
import { SubTitle } from "./HubImagesListPreview"

const recommendedCategories = [
  { label: "Text", icon: TextIcon },
  { label: "Image", icon: ImageIcon },
  { label: "Video", icon: VideoIcon },
  { label: "Audio", icon: AudioIcon },
]

const CardWithOutline = styled.div`
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  background: ${(props) => props.theme.palette.background.default};
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`
const RecommendedCategoryItem = styled.div`
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  svg {
    width: 3rem;
    height: 3rem;
  }
`
const CategoryLabel = styled.span`
  font-weight: 400;
  font-size: 1.5rem;
  color: ${(props) => props.theme.palette.action.disabled};
`
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const HubRecommendedCategories = () => (
  <CardWithOutline>
    <SubTitle>Recommended Categories</SubTitle>
    <FlexContainer>
      {recommendedCategories.map((category, index) => (
        <RecommendedCategoryItem key={index}>
          <category.icon color="primary" />
          <CategoryLabel>{category.label}</CategoryLabel>
        </RecommendedCategoryItem>
      ))}
    </FlexContainer>
  </CardWithOutline>
)

export default HubRecommendedCategories
