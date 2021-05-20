import React from "react"
import { AppBar, Tab, Tabs } from "@material-ui/core"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function HubNavigationBar() {
  const [value, setValue] = React.useState(0)

  const NavItems = ["Hub Explore", "Hub List", "My Images", "My Favourites"]

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <AppBar position={"static"}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {NavItems.map((NavItem, idx) => (
          <Tab label={NavItem} {...a11yProps(idx)} />
        ))}
      </Tabs>
    </AppBar>
  )
}
