import React from "react";
import HubOverviewAction from './HubOverviewAction'

const HubOverviewActionsContainer = () => {
    const hubOverviewActionsData = [
        {
            title: 'Explore',
            description: 'Find out what you can do in Jina hub and how you platform works.',
            buttonLabel: 'Read more'
        },
        {
            title: 'Create',
            // design is not final. Description will probably change.
            description: 'Create',
            buttonLabel: 'Let\'s Go'
        }
    ]

    return (
        <>
            { hubOverviewActionsData.map(overviewAction => ( <HubOverviewAction overviewAction={overviewAction} /> ))}
        </>
    )
}

export default HubOverviewActionsContainer