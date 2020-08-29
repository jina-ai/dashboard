import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItems from "./SidebarNavItems";

import { Store, Dispatcher, Constants } from "../../../flux";

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems(),
    };
    Store.on("update-ui", this.onChange);
  }

  componentWillUnmount() {
    Store.removeListener("update-ui", this.onChange);
  }

  onChange = () => {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems(),
    });
  };

  toggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  };

  render() {
    const { sidebarNavItems } = this.state;
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.state.menuVisible && "open"
    );

    return (
      <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
        <SidebarMainNavbar toggleSidebar={this.toggleSidebar} />
        <SidebarNavItems
          navItems={sidebarNavItems}
          toggleSidebar={this.toggleSidebar}
        />
      </Col>
    );
  }
}

export default MainSidebar;
