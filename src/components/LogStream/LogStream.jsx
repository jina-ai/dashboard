import React from "react";
import { Card, FormControl, Row, Col, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import LogItem from './LogItem';
import lunr from 'lunr';
import { saveAs } from 'file-saver';
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
		logData: Store.getLogs(),
		logs: Store.getLogs().all,
		sources: Store.getLogSources(),
		searchQuery: "",
		prevQuery: "",
		results: [],
		showHelper: false,
		selectedSource: 'all',
	}

	componentWillMount = () => {
		Store.on('update-logs', this.getData);
		Store.on('show-log', this.getIndexedLog);
	}

	componentWillUnmount = () => {
		Store.removeListener('update-logs', this.getData);
		Store.removeListener('show-log', this.getIndexedLog);
	}

	downloadLogs = (format) => {
		let logs = this.state.logData.all;
		let content = '';
		if (format === 'json')
			content = '[\n';
		else if (format === 'csv')
			content = 'created,formatted timestamp,name,process,level name,message,filename,line number,module,funcname,pathname\n';

		for (let i = 0; i < logs.length; ++i) {
			let log = logs[i];
			if (format === 'json')
				content += (JSON.stringify(logs[i]) + `${i < logs.length - 1 ? ',' : ''}\n`);
			else if (format === 'csv')
				content += `${log.created},"${log.formattedTimestamp}",${log.name},${log.process},${log.levelname},"${log.msg}",${log.filename},${log.lineno},${log.module},${log.funcname},${log.pathname}\n`
			else
				content += `${log.formattedTimestamp} ${log.name}@${log.process} [${log.levelname}]: ${log.msg}\n`
		}
		if (format === 'json')
			content += ']';

		let filename = `jina-logs-${new Date()}.${format}`;
		let blob = new Blob([content], { type: 'text,plain;charset=utf-8' });
		saveAs(blob, filename);
	}

	componentDidMount = () => {
		setTimeout(() => {
			if (this._list) {
				this._resizeAll();
				this.backToBottom();
			}
		}, 1)
	}

	getData = () => {
		const logData = Store.getLogs();
		const sources = Store.getLogSources();
		const logs = logData[this.state.selectedSource];
		this.setState({ logs, sources, logData });
		if (this._scrolledToBottom && this._list)
			this.scrollToBottom();
	}

	getIndexedLog = () => {
		const index = Store.getIndexedLog();
		const selectedSource = 'all';
		const logs = this.state.logData[selectedSource];
		this.setState({ selectedSource, logs });
		console.log('scrolling to index: ', index);
		this.scrollToLog(index);
	}

	setSelectedSource = (selectedSource) => {
		const { logData } = this.state;
		const logs = logData[selectedSource];
		this.setState({ logs, selectedSource }, () => {
			this._resizeAll();
			this.backToBottom();
		})
	}

	search = () => {
		const query = this.state.searchQuery;
		console.log('search query: ', query)
		if (!query)
			return this.setState({ results: false }, this._resizeAll)
		this.indexLogs();
		let results = this.index.search(`${query}*`)
		this.setState({ results }, this._resizeSearchResults);
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

	scrollToBottomResults = () => {
		this._resultsList.scrollToRow(this.state.results.length);
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
			results: false,
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
					<LogItem index={index} data={log} />
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
		const { results, searchQuery, logs, showHelper, sources } = this.state;
		return (
			<Card className="mb-4">
				<Card.Header className="p-3">
					<Row>
						<Col md="4" xs="6">
							<FormControl as="select" onChange={(e) => this.setSelectedSource(e.target.value)}>
								<option value="all">All Logs</option>
								{
									Object.keys(sources).map(source =>
										<option key={source} value={source}>{source}</option>
									)
								}
							</FormControl>
						</Col>
						<Col md="4" className="d-none d-md-inline-block">
							<DropdownButton as={ButtonGroup} title="Download Logs" id="bg-nested-dropdown">
								<Dropdown.Item onClick={()=>this.downloadLogs('csv')}>Download as CSV</Dropdown.Item>
								<Dropdown.Item onClick={()=>this.downloadLogs('json')}>Download as JSON</Dropdown.Item>
								<Dropdown.Item onClick={()=>this.downloadLogs('txt')}>Download as TXT</Dropdown.Item>
							</DropdownButton>
						</Col>
						<Col md="4" xs="6">
							<FormControl
								placeholder="search logs..."
								onKeyPress={this.listenForEnter}
								onChange={this.updateSearchQuery}
								value={searchQuery}
							/>
						</Col>
					</Row>
				</Card.Header>
				<Card.Body className="log-stream-container p-1 border-top" id="log-stream-container">
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
										setTimeout(this.backToBottom, 1);
									}
									if (this._mostRecentHeight !== height) {
										this._mostRecentHeight = height;
										setTimeout(this._resizeAll, 0);
										setTimeout(this.backToBottom, 1);
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

		if (difference < 10)
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
