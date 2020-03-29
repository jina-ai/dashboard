import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Store, Dispatcher, Constants } from "../../flux";


class MainNavbar extends React.Component {
	state = {
		currentTab: Store.getCurrentTab(),
	}

	componentWillMount = () => {
		Store.on('update-ui', this.getData)
	}

	componentWillUnmount = () => {
		Store.removeListener('update-ui', this.getData)
	}

	getData = () => {
		const currentTab = Store.getCurrentTab();
		this.setState({ currentTab });
	}

	setCurrentTab = (tab) => {
		Dispatcher.dispatch({
			actionType: Constants.SET_CURRENT_TAB,
			payload: tab
		})
	}

	render = () => {
		const { currentTab } = this.state;
		return (
			<Navbar bg="white" expand="lg" sticky="top">
				<Container fluid className="px-0">
					<Navbar.Brand href="/">
						<b>Jina </b><span className="d-none d-md-inline">Dashboard</span>
          </Navbar.Brand>
					<div className="center-tabs d-flex">
						<div className="mx-auto">
							<div className={`nav-tab d-inline-block px-2 py-2 ${currentTab==='logStream'&&'active'}`} variant="outline-secondary" onClick={()=>this.setCurrentTab('logStream')}>Log Stream</div>
							<div className={`nav-tab d-inline-block px-2 py-2 ${currentTab==='flowChart'&&'active'}`} variant="outline-secondary" onClick={()=>this.setCurrentTab('flowChart')}>Flow Chart</div>
						</div>
					</div>
				</Container>
			</Navbar>
		)
	}
}

export default MainNavbar;

