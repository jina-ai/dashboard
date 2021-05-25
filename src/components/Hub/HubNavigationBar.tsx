import React, { ChangeEvent, useState } from "react"
import { AppBar, InputBase, Tab, Tabs, Toolbar } from "@material-ui/core"
import styled from "@emotion/styled"
import SearchIcon from "@material-ui/icons/Search"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

type Props = {
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void
  handleSearch: (searchString: string) => void
  tabNumber: number
}

export default function HubNavigationBar({
  handleChange,
  handleSearch,
  tabNumber,
}: Props) {
  let [searchString, setSearchString] = useState("")

  const NavItems = ["Hub Explore", "Hub List", "My Images", "My Favourites"]

  const SearchBar = styled.div`
    background-color: ${(props) => props.theme.palette.searchBarBackground};
    border-radius: 2px;
    cursor: pointer;
    min-width: 350px;
    display: flex;
  `

  const HubTabs = styled(Tabs)`
    flex-grow: 1;
  `

  const HubSearchIcon = styled(SearchIcon)`
    margin: 11px;
    margin-left: 20px;
  `

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleSearch(searchString)
  }
  return (
    <AppBar elevation={0} position={"static"}>
      <Toolbar>
        <HubTabs
          value={tabNumber}
          onChange={handleChange}
          aria-label="simple tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          {NavItems.map((NavItem, idx) => (
            <Tab label={NavItem} {...a11yProps(idx)} />
          ))}
        </HubTabs>
        <SearchBar>
          <HubSearchIcon onClick={(e) => handleSearch(searchString)} />
          <InputBase
            onKeyPress={handleKeyPress}
            autoFocus={true} //todo this is a hack. It looses focus after setSearchString gets triggered
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search"
            fullWidth={true}
          />
        </SearchBar>
      </Toolbar>
    </AppBar>
  )
}
