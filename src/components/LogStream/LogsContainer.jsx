import React from "react";
import { Card, FormControl, Row, Col } from 'react-bootstrap';
import LogItem from './LogItem';
import lunr from 'lunr';
import { Store } from '../../flux';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CellMeasurer, {
	CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';

class StreamContainer extends React.Component {
	_cache = new CellMeasurerCache({ defaultHeight: 10, fixedWidth: true });
	_mostRecentWidth = 0;
	_mostRecentHeight = 0;
	_resizeAllFlag = false;
	_startIndex = 0;
	_scrollIndex = 0;
	_scrollTop = 0;
	_scrolledToBottom = true;

	state = {
		logs: Store.getLogs(),
		searchQuery: "",
		searchResults: false,
	}

	componentWillMount = () => {
		Store.on('update-logs', this.getData);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-logs', this.getData);
	}

	getData = () => {
		const logs = Store.getLogs();
		this.setState({ logs }, () => {
			if (this._scrolledToBottom && this._list)
				this.scrollToLog();
			if(this.state.searchQuery)
				this.search();
		});
	}

	search = () => {
		const query = this.state.searchQuery;
		console.log('search query: ', query)
		this.indexLogs();
		let results = this.index.search(query)
		this.setState({ results });
		console.log('search results: ', results)
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

	scrollToLog = (index = this.state.logs.length) => {
		this._list.scrollToRow(index);
	}

	updateSearchQuery = (e) => {
		this.setState({ searchQuery: e.target.value },this.search);
	}

	clearSearchResults = () => {
		this.setState({
			searchResults: false,
			searchQuery: ""
		})
	}

	renderSearchResults = () => {
		const { results, searchQuery, logs } = this.state;
		return (
			<div className="search-container">
				<p className="text-muted"><i>results for "{searchQuery}"</i><span className="float-right"><a onClick={this.clearSearchResults}>← back to log stream</a></span></p>
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

	renderLogRow = ({ index, isScrolling, key, parent, style }) => {
		const { highlighted } = this.state;
		const log = this.state.logs[index];
		return (
			<CellMeasurer
				cache={this._cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div style={style}>
					<LogItem data={log} />
				</div>
			</CellMeasurer>
		)
	};

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
				<Card.Body className="log-stream-container p-0" id="log-stream-container">
					{
						searchQuery && results?
						this.renderSearchResults()
						:
						<AutoSizer>
						{({ height, width }) => {
							if (this._mostRecentWidth !== width) {
								this._mostRecentWidth = width;
								setTimeout(this._resizeAll, 0);
							}
							if(this._mostRecentHeight !== height){
								this._mostRecentHeight = height;
								setTimeout(this.scrollToLog,0);
							}
							return (
								<List
									width={width}
									height={height}
									ref={ref => this._list = ref}
									deferredMeasurementCache={this._cache}
									rowHeight={this._cache.rowHeight}
									rowCount={logs.length}
									rowRenderer={this.renderLogRow}
									onScroll={this._onScroll}
								/>)
						}
						}
					</AutoSizer>
					}
				</Card.Body>
			</Card>
		)
	}

	_onRowsRendered = (data, cb) => {
		const { startIndex } = data;
		this._startIndex = startIndex;
	}

	_onScroll = (data) => {
		const { scrollTop, scrollHeight, clientHeight } = data;
		this._scrollTop = scrollTop;
		if (scrollTop + clientHeight === scrollHeight)
			this._scrolledToBottom = true;
		else
			this._scrolledToBottom = false;
	}

	_resizeAll = () => {
		this._resizeAllFlag = false;
		this._cache.clearAll();
		if (this._list) {
			this._list.recomputeRowHeights();
		}
	};
}

export default StreamContainer;
