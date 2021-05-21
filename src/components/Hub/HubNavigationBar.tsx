import React from "react"
import { AppBar, InputBase, Tab, Tabs, Toolbar } from "@material-ui/core"
import styled from "@emotion/styled"
import SearchIcon from "@material-ui/icons/Search"

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

  const SearchBar = styled.div`
    background-color: ${(props) => "#F9F9F9"};
    border-radius: 2px;
  `

  const HubSearchIcon = styled(SearchIcon)``

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          textColor="secondary"
          indicatorColor="primary"
        >
          {NavItems.map((NavItem, idx) => (
            <Tab label={NavItem} {...a11yProps(idx)} />
          ))}
        </Tabs>
        <SearchBar>
          <HubSearchIcon />
          <InputBase placeholder="Search" />
        </SearchBar>
      </Toolbar>
    </AppBar>
  )
}
