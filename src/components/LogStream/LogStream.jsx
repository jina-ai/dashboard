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
	_resultsCache = new CellMeasurerCache({ defaultHeight: 10, fixedWidth: true });

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
		prevQuery: "",
		searchResults: false,
		showHelper: false
	}

	componentWillMount = () => {
		Store.on('update-logs', this.getData);
		Store.on('show-log', this.getIndexedLog);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-logs', this.getData);
		Store.removeListener('show-log', this.getIndexedLog);
	}

	componentDidMount = () => {
		setTimeout(() => {
			if (this._list)
				this._resizeAll();
			this.scrollToBottom()
		}, 1)

	}

	getData = () => {
		const logs = Store.getLogs();
		this.setState({ logs });
		if (this._scrolledToBottom && this._list)
			this.scrollToBottom();
	}

	getIndexedLog = () => {
		const index = Store.getIndexedLog();
		console.log('scrolling to index: ', index);
		this.scrollToLog(index);
	}

	search = () => {
		const query = this.state.searchQuery;
		console.log('search query: ', query)
		this.indexLogs();
		let results = this.index.search(query)
		this.setState({ results },this._resizeSearchResults);
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

	scrollToLog = (index) => {
		this._list.scrollToRow(index);
	}

	scrollToBottom = () => {
		this._list.scrollToRow(this.state.logs.length);
		this._scrolledToBottom = true;
	}

	backToBottom = () => {
		this.scrollToBottom();
		setTimeout(this.scrollToBottom, 1);
	}

	updateSearchQuery = (e) => {
		this.setState({ searchQuery: e.target.value }, this.search);
	}

	clearSearchResults = () => {
		this.setState({
			searchResults: false,
			searchQuery: ""
		})
	}

	renderSearchResults = () => {
		const { results } = this.state;
		return (
			<AutoSizer>
				{({ height, width }) => {
					if (this._mostRecentWidth !== width) {
						this._mostRecentWidth = width;
						setTimeout(this._resizeSearchResults, 0);
					}
					if (this._mostRecentHeight !== height) {
						this._mostRecentHeight = height;
						setTimeout(this._resizeSearchResults, 0);
					}
					return (
						<List
							width={width}
							height={height}
							ref={ref => this._resultsList = ref}
							deferredMeasurementCache={this._resultsCache}
							rowHeight={this._resultsCache.rowHeight}
							rowCount={results.length}
							rowRenderer={this.renderSearchResultRow}
						/>)
				}
				}
			</AutoSizer>
		)
	}

	renderLogRow = ({ index, isScrolling, key, parent, style }) => {
		const log = this.state.logs[index];
		return (
			<CellMeasurer
				cache={this._cache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div style={{
					...style,
					wordBreak: 'break-word',
				}}>
					<LogItem data={log} />
				</div>
			</CellMeasurer>
		)
	};

	renderSearchResultRow = ({ index, isScrolling, key, parent, style }) => {
		const result = this.state.results[index];
		const log = this.state.logs[result.ref];
		return (
			<CellMeasurer
				cache={this._resultsCache}
				columnIndex={0}
				key={key}
				parent={parent}
				rowIndex={index}
			>
				<div style={{
					...style,
					wordBreak: 'break-word',
				}}>
					<LogItem data={log} />
				</div>
			</CellMeasurer>
		)
	};

	render = () => {
		const { results, searchQuery, logs, showHelper } = this.state;
		return (
			<Card>
				<Card.Header>
					<Row>
						<Col className="col-md-8">
							<h4 className="pt-1 mb-0"><b>Log Stream</b></h4>
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
						searchQuery && results ?
							''
							:
							<div onClick={this.backToBottom} className={`back-to-bottom ${showHelper && 'active'}`}><i className="material-icons">arrow_downward</i> Back to Bottom</div>
					}
					{
						searchQuery && results ?
							this.renderSearchResults()
							:
							<AutoSizer>
								{({ height, width }) => {
									if (this._mostRecentWidth !== width) {
										this._mostRecentWidth = width;
										setTimeout(this._resizeAll, 0);
									}
									if (this._mostRecentHeight !== height) {
										this._mostRecentHeight = height;
										setTimeout(this.scrollToBottom, 0);
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
											scrollToAlignment="center"
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
		let difference = scrollHeight - (scrollTop + clientHeight);

		if (difference === 0)
			this._scrolledToBottom = true;
		else {
			this._scrolledToBottom = false;
		}

		if (difference > 75 && !this.state.showHelper)
			this.setState({ showHelper: true })
		else if (difference <= 75 && this.state.showHelper)
			this.setState({ showHelper: false });
	}

	_resizeAll = () => {
		this._resizeAllFlag = false;
		this._cache.clearAll();
		if (this._list) {
			this._list.recomputeRowHeights();
		}
	};

	_resizeSearchResults = () => {
		this._resizeAllFlag = false;
		this._resultsCache.clearAll();
		if (this._resultsList) {
			this._resultsList.recomputeRowHeights();
		}
	};
}

export default StreamContainer;
