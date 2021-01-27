import React from "react";
import { useHistory } from "react-router-dom";
import HubOverviewAction from "./HubOverviewAction";

type HubOverviewActionDataType = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonAction: () => void;
};

const HubOverviewActionsContainer = () => {
  const history = useHistory();

  const hubOverviewActionsData: HubOverviewActionDataType[] = [
    {
      title: "Explore",
      description:
        "Find out what you can do in Jina hub and how you platform works.",
      buttonLabel: "Read more",
      buttonAction: () => history.push("/hub/explore"),
    },
    {
      title: "Create",
      // design is not final. Description will probably change.
      description: "Create flow",
      buttonLabel: "Let's Go",
      buttonAction: () => history.push("/flow"),
    },
  ];

  return (
    <>
      {hubOverviewActionsData.map((overviewAction) => (
        <HubOverviewAction
          overviewAction={overviewAction}
          key={overviewAction.title}
        />
      ))}
    </>
  );
};

export default HubOverviewActionsContainer;
