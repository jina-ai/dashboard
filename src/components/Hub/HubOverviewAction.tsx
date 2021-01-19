import React from "react";

type overviewActionType = {
    title: string
    description: string
    buttonLabel: string
}

type HubOverviewActionProps = {
    overviewAction: overviewActionType
}

const HubOverviewAction = ({overviewAction}: HubOverviewActionProps) => {
    const {title, description, buttonLabel} = overviewAction
    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            <button>{buttonLabel}</button>
        </>
    )

}

export default HubOverviewAction