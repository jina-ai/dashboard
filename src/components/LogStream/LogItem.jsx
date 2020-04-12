import React from "react";
import { Row, Col } from "react-bootstrap";

class LogItem extends React.Component {
	render = () => {
		const { data } = this.props;
		const { name, msg, levelname, process, formattedTimestamp } = data;
		let logName = String(name)
		logName = logName.length > 20 ? logName.substring(0, 20) : logName;
		let levelInitial = String(levelname)[0];
		return (
			<div className={`log log-${String(levelname).toLowerCase()} px-4 border-bottom py-1`}>
				<Row>
					<Col lg="2" md="3" className="log-prefix text-muted px-0 pt-2 pt-md-0 text-lg-right">{formattedTimestamp}</Col>
					<Col lg="3" md="3" className="log-prefix px-0 text-left text-md-right">
						{logName}@{process}[{levelInitial}]:
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
