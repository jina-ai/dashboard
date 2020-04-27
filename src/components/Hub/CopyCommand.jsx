import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from 'shards-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from '../../helpers';
import { Dispatcher, Constants } from '../../flux';

class CopyCommand extends React.Component {
	getCodeAtIndex = (index) => {
		const { image } = this.props;
		const imageVar = image.repoTags[image.repoTags.length - 1]
		let code = [
			`from jina.flow import Flow\nf = Flow().add(name='my-pod', image='${imageVar}')`,
			`from jina.flow import Flow\n# assuming you have a running gateway on 192.168.0.123:45678\nf = Flow().add(name='my-pod', image='${imageVar}', yaml_path='my.yml')`,
			`from jina.flow import Flow\n# assuming you have a running gateway on 192.168.0.123:45678\nf = Flow().add(name='my-pod', image='${imageVar}', host='192.168.0.123', port_grpc=45678)`,
			`!Flow\npods:\n  my_pod1:\n    image: "${imageVar}"`,
			`jina pod --image ${imageVar}`,
			`docker run -p 55555:55555 -p 55556:55556 ${imageVar} --port-in 55555 --port-out 55556`,
			`docker run -v $(pwd)/my.yml:/my.yml ${imageVar} --yaml-path /my.yml`
		]
		return code[index];
	}
	copyCode = (index) => {
		const content = this.getCodeAtIndex(index);
		copyToClipboard(content)
		Dispatcher.dispatch({
			actionType: Constants.SHOW_BANNER,
			payload: ['hub', 'Content copied to clipboard', 'success']
		})

	}
	render = () => {
		const { image } = this.props;
		return (
			<Card className="mb-4">
				<CardHeader className="p-3 border-bottom d-flex flex-row">
					<h6 className="m-0 d-inline-block">Usage</h6>
				</CardHeader>
				<CardBody className="py-2 px-3 pt-4 code-usage">
					<p className="mb-1">Use this image in Flow API</p>
					<SyntaxHighlighter language="python" style={atomOneDark} onClick={()=>this.copyCode(0)}>
						{this.getCodeAtIndex(0)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image in Flow API and override YAML</p>
					<SyntaxHighlighter language="python" style={atomOneDark} onClick={()=>this.copyCode(1)}>
						{this.getCodeAtIndex(1)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image remotely in Flow API</p>
					<SyntaxHighlighter language="python" style={atomOneDark} onClick={()=>this.copyCode(2)}>
						{this.getCodeAtIndex(2)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image in Flow YAML</p>
					<SyntaxHighlighter language="yaml" style={atomOneDark} onClick={()=>this.copyCode(3)}>
						{this.getCodeAtIndex(3)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image in Jina CLI</p>
					<SyntaxHighlighter language="bash" style={atomOneDark} onClick={()=>this.copyCode(4)}>
						{this.getCodeAtIndex(4)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image in Docker CLI</p>
					<SyntaxHighlighter language="bash" style={atomOneDark} onClick={()=>this.copyCode(5)}>
						{this.getCodeAtIndex(5)}
					</SyntaxHighlighter>
					<p className="mb-1 mt-4">Use this image in Docker CLI and override YAML</p>
					<SyntaxHighlighter language="bash" style={atomOneDark} onClick={()=>this.copyCode(6)}>
						{this.getCodeAtIndex(6)}
					</SyntaxHighlighter>
				</CardBody>
			</Card>
		)
	}
}

export default CopyCommand;
