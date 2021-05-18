import React from "react";
import Card from "@material-ui/core/Card"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import hubIconSource from "../../assets/icons/hub-icon.svg"

const HubOverviewActionCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(269.3deg, #009999 16.55%, #4DB6AC 89.83%);
`
const HubOverviewActionCardContent = styled.div`
  flex-direction: column;
`
const HubOverviewTitle = styled.h6`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.background};
`
const HubIcon = styled.img`
  width: 8rem;
`
const HubOverviewDescription = styled.div`
  font-weight: 400;
  color: ${(props) => props.theme.palette.background};
`
const HubOverviewButtonsContainer = styled.div`
  margin-top: 2rem;
`
const PrimaryActionButton = styled(Button)`
  background-color: ${(props) => props.theme.palette.background};
  color: ${(props) => props.theme.palette.primary};
  margin-right: 1.5rem;
  &:hover {
    border-color: ${(props) => props.theme.palette.background};
    background-color: ${(props) => props.theme.palette.primary};
    color: ${(props) => props.theme.palette.background};
  }
`
const SecondaryActionButton = styled(Button)`
  color: ${(props) => props.theme.palette.background};
  border-color: ${(props) => props.theme.palette.background};
  margin-right: 1.5rem;
  &:hover {
    border-color: ${(props) => props.theme.palette.background};
    background-color: ${(props) => props.theme.palette.background};
    color: ${(props) => props.theme.palette.primary};
  }
`

const HubOverviewActionsContainer = () => {
  const history = useHistory();

  return (
    <HubOverviewActionCard>
      <HubOverviewActionCardContent >
        <HubOverviewTitle>Jina Hub</HubOverviewTitle>
        <HubOverviewDescription>
          Discover images created by the community in a centralized registry or create your own images
      </HubOverviewDescription>
        <HubOverviewButtonsContainer>
          <PrimaryActionButton variant="contained" disableElevation onClick={() => history.push("/hub/explore")}>
            Browse
        </PrimaryActionButton>
          <SecondaryActionButton variant="outlined" onClick={() => history.push("/flow")}>
            Create
        </SecondaryActionButton>
        </HubOverviewButtonsContainer>
      </HubOverviewActionCardContent>
      <HubIcon src={hubIconSource} alt="Hub Icon" />
    </HubOverviewActionCard>
  );
};

export default HubOverviewActionsContainer;
