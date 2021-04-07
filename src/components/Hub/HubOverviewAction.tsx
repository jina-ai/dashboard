import React from "react"
import styled from "@emotion/styled"
import { Button } from '@material-ui/core'

const ActionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 35%;
`

const ActionItemTitle = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`

const ActionButton = styled(Button)`
  background: ${(props) => props.theme.palette.primary};
  border-radius: 10px;
  border: none;
  padding: 1rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.palette.background};
`

type overviewActionType = {
  title: string
  description: string
  buttonLabel: string
  buttonAction: () => void
}

type HubOverviewActionProps = {
  overviewAction: overviewActionType
}

const HubOverviewAction = ({ overviewAction }: HubOverviewActionProps) => {
  const { title, description, buttonLabel, buttonAction } = overviewAction
  return (
    <ActionItemContainer>
      <>
        <ActionItemTitle data-name="hubOverviewActionTitle">
          {title}
        </ActionItemTitle>
        <p>{description}</p>
      </>
      <ActionButton
        data-name="hubOverviewActionButtonLabel"
        onClick={buttonAction}
      >
        {buttonLabel}
      </ActionButton>
    </ActionItemContainer>
  )
}

export default HubOverviewAction
