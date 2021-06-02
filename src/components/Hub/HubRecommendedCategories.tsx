import React from "react"
import styled from "@emotion/styled"
import {
  TextFields as TextIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
  Audiotrack as AudioIcon,
} from "@material-ui/icons"
import Grid from "@material-ui/core/Grid"
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

const HubRecommendedCategories = () => (
  <CardWithOutline>
    <SubTitle>Recommended Categories</SubTitle>
    <Grid container>
      {recommendedCategories.map((category, index) => (
        <Grid item xs={3} key={index}>
          <RecommendedCategoryItem>
            <category.icon color="primary" />
            <CategoryLabel>{category.label}</CategoryLabel>
          </RecommendedCategoryItem>
        </Grid>
      ))}
    </Grid>
  </CardWithOutline>
)

export default HubRecommendedCategories
