import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from './Layouts'
import LogsView from './Views/LogsView';
import FlowView from './Views/FlowView';
import { Store } from './flux';

class App extends React.Component {
  state = {
    currentTab: Store.getCurrentTab()
  }

  componentDidMount = () => {
    Store.on('update-ui',this.getData);
  }

  componentWillUnmount = () => {
    Store.removeListener('update-ui',this.getData);
  }

  getData = () => {
    const currentTab = Store.getCurrentTab();
    this.setState({ currentTab});
  }

  render = () => {
    const {currentTab} = this.state;
    return (
      <div className="App">
        <DefaultLayout>
          {
            currentTab==='logStream'?
            <LogsView />
            :
            <FlowView />
          }
        </DefaultLayout>
      </div>
    );
  }
}


export default App;
