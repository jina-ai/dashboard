import React from "react";
import { Row, Col } from "react-bootstrap";

class LogItem extends React.Component {
	render = () => {
		const { data } = this.props;
		const { name, msg, levelname, process } = data;
		let logName = String(name)
		logName = logName.length > 20 ? logName.substring(0, 20) : logName;
		let levelInitial = String(levelname)[0];
		return (
			<div className={`log log-${String(levelname).toLowerCase()} px-4`}>
				<Row>
					<Col lg="3" md="4" className="log-prefix px-0 text-left text-md-right">
						<b>{logName}@{process}[{levelInitial}]:</b>
					</Col>
					<Col className="px-0">
						{msg}
					</Col>
				</Row>
			</div>
		)
	}
}

export default LogItem;
