import React from "react";
import { Container, Row, Col,Form,Button } from 'react-bootstrap';
import { Dispatcher,Constants,Store } from '../flux';
import StreamContainer from '../components/LogStream/StreamContainer';
import Chart from '../components/LogStream/Chart';


class LogsView extends React.Component {
  state = {
    logs: Store.getLogs()
  }

  componentWillMount = () =>{
    Store.on('update-logs',this.getData); 
  }

  componentWillUnmount = () =>{
    Store.removeListener('update-logs',this.getData);
  }

  getData = () =>{
    const logs = Store.getLogs();
    this.setState({logs});
  }

  render = () => {
    const { plan,logs } = this.state;
    return (
      <Container className="main-content-container py-4 pb-5">
        {/* <Chart data={[]}/> */}
        <StreamContainer logs={logs}/>
      </Container>
    )
  }
}

export default LogsView;
