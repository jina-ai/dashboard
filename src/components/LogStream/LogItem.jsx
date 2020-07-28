import React from "react";
import { Row, Col } from "react-bootstrap";

class LogItem extends React.Component {
	render = () => {
		const { data } = this.props;
		const { name, msg, levelname, process, formattedTimestamp, idx } = data;
		let logName = String(name)
		logName = logName.length > 20 ? logName.substring(0, 20) : logName;
		let levelInitial = String(levelname)[0];
		return (
			<div className={`log log-${String(levelname).toLowerCase()} px-4 border-bottom py-1`}>
				<Row >
					<Col lg="2" md="3" className="log-prefix text-muted px-0 d-flex flex-row">
						<div className="text-bold mr-2">{idx}</div>
						<div className="ml-auto">{formattedTimestamp}</div>

					</Col>
					<Col lg="3" md="4" className="log-prefix px-0 text-left text-md-right text-bold">
						{logName}@{process}[{levelInitial}]:
					</Col>
					<Col sm="12" md="5" lg="7" className="px-0">
						{msg}
					</Col>
				</Row>
			</div>
		)
	}
}

export default LogItem;
