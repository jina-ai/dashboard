import React from "react"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"
import { Card, Button } from "@material-ui/core"
import hubIconSource from "../../assets/icons/hub-icon.svg"

const HubOverviewActionCard = styled(Card)`
  max-height: 11rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  background: ${(props) =>
    `linear-gradient(269.3deg, ${props.theme.palette.primary.main} 16.55%, ${props.theme.palette.primary.light} 89.83%)`};
`
const HubOverviewActionCardContent = styled.div`
  flex-direction: column;
`
const HubOverviewTitle = styled.h6`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.background.default};
`
const HubIcon = styled.img`
  width: 8rem;
`
const HubOverviewDescription = styled.div`
  font-weight: 400;
  color: ${(props) => props.theme.palette.background.default};
`
const HubOverviewButtonsContainer = styled.div`
  margin-top: 2rem;
`
const PrimaryActionButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.palette.primary.main};
  margin-right: 1.5rem;
  &:hover {
    border-color: ${(props) => props.theme.palette.background.default};
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.background.default};
  }
`
const SecondaryActionButton = styled(Button)`
  color: ${(props) => props.theme.palette.background.default};
  border-color: ${(props) => props.theme.palette.background.default};
  margin-right: 1.5rem;
  &:hover {
    border-color: ${(props) => props.theme.palette.background.default};
    background-color: ${(props) => props.theme.palette.background.default};
    color: ${(props) => props.theme.palette.primary.main};
  }
`

const HubOverviewActionsContainer = () => {
  const history = useHistory()

  return (
    <HubOverviewActionCard>
      <HubOverviewActionCardContent>
        <HubOverviewTitle data-name="title">Jina Hub</HubOverviewTitle>
        <HubOverviewDescription>
          Discover images created by the community in a centralized registry or
          create your own images
        </HubOverviewDescription>
        <HubOverviewButtonsContainer>
          <PrimaryActionButton
            data-name="primaryActionButton"
            variant="contained"
            disableElevation
            onClick={() => history.push("/hub/explore")}
          >
            Browse
          </PrimaryActionButton>
          <SecondaryActionButton
            data-name="secondaryActionButton"
            variant="outlined"
            onClick={() => history.push("/flow")}
          >
            Create
          </SecondaryActionButton>
        </HubOverviewButtonsContainer>
      </HubOverviewActionCardContent>
      <HubIcon src={hubIconSource} alt="Hub Icon" />
    </HubOverviewActionCard>
  )
}

export default HubOverviewActionsContainer
