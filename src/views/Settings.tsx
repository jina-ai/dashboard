import React from "react"
import { PageTitle } from "../components/Common/PageTitle"
import SettingsCard from "../components/Settings/Settings"

class SettingsView extends React.Component {
  render = () => {
    return (
      <div className="main-content-container px-4">
        <div className="page-header mb-4">
          <PageTitle title="Settings" className="text-sm-left mb-3" />
        </div>
        <SettingsCard />
      </div>
    )
  }
}

export default SettingsView
