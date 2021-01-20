import React from "react";
import styled from "@emotion/styled";

const ActionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 35%;
`;

const ActionItemTitle = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`;

const ActionButton = styled.button`
  background: linear-gradient(225deg, #00c9c9 0%, #009999 100%);
  border-radius: 10px;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

type overviewActionType = {
  title: string;
  description: string;
  buttonLabel: string;
};

type HubOverviewActionProps = {
  overviewAction: overviewActionType;
};

const HubOverviewAction = ({ overviewAction }: HubOverviewActionProps) => {
  const { title, description, buttonLabel } = overviewAction;
  return (
    <ActionItemContainer>
      <>
        <ActionItemTitle>{title}</ActionItemTitle>
        <p>{description}</p>
      </>
      <ActionButton>{buttonLabel}</ActionButton>
    </ActionItemContainer>
  );
};

export default HubOverviewAction;
