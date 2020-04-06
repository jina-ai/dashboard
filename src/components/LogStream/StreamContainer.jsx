import React from "react";
import { cloneDeep } from 'lodash';
import { Card, FormControl, Row, Col } from 'react-bootstrap';
import LogItem from '../LogStream/LogItem';
import lunr from 'lunr';

class StreamContainer extends React.Component {
	state = {
		logs: this.props.logs,
		tab: 'logs',
		searchQuery: null,
		searchResults: false,
	}

	search = () => {
		const query = this.state.searchQuery;
		console.log('search query: ', query)
		this.indexLogs();
		let results = this.index.search(query)
		this.setState({ results });
		console.log('search results: ', results)
	}

	scrollToBottom = () => {
		var objDiv = document.getElementById("log-stream-container");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.logs.length !== this.state.logs.length) {
			this.setState({ logs: cloneDeep(nextProps.logs) })
			if (this.state.searchQuery)
				this.search()
		}
	}

	listenForEnter = (key) => {
		if (key.charCode == 13) {
			this.search()
		}
	}

	indexLogs = () => {
		const { logs } = this.state;
		console.log('indexing', logs.length, 'logs for search')
		this.index = lunr(function () {
			this.field('filename');
			this.field('funcName');
			this.field('msg');
			this.field('name');
			this.field('module');
			this.field('pathname');

			logs.map((log, idx) => {
				log.id = parseInt(idx);
				this.add(log);
			});
		})
	}

	updateSearchQuery = (e) => {
		this.setState({ searchQuery: e.target.value });
	}

	clearSearchResults = () => {
		this.setState({
			searchResults: false,
			searchQuery: null
		})
	}

	renderSearchResults = () => {
		const { results, searchQuery, logs } = this.state;
		return (
			<div>
				<p className="text-muted"><i>results for "{searchQuery}"</i><span className="float-right"><a>← back to log stream</a></span></p>
				{
					results.length > 0 ?
						results.map(result => {
							const log = logs[parseInt(result.ref)];
							return (
								<LogItem data={log} />
							)
						})
						:
						'no results found'
				}
			</div>
		)
	}

	render = () => {
		const { results, searchQuery, logs } = this.state;
		return (
			<Card>
				<Card.Header>
					<Row>
						<Col className="col-md-8">
							<h4 className="pt-1 mb-0">Log Stream</h4>
						</Col>
						<Col className="col-md-4">
							<FormControl
								placeholder="search logs..."
								onKeyPress={this.listenForEnter}
								onChange={this.updateSearchQuery}
								value={searchQuery}
							/>
						</Col>
					</Row>
				</Card.Header>
				<Card.Body className="log-stream-container" id="log-stream-container">
					{
						searchQuery && results ?
							this.renderSearchResults()
							:
							logs.map(log => {
								return <LogItem data={log} />
							})
					}
				</Card.Body>
			</Card>
		)
	}
}

export default StreamContainer;
