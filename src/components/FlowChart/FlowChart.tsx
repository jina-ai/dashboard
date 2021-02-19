import ReactFlow, { Elements } from "react-flow-renderer"
import React from "react"

type Props = {
  elements: Elements
}

// let id = 0;
// const getId = () => `dndnode_${id++}`;

export default function FlowChart(props: Props) {
  // const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);
  //
  // const reactFlowWrapper = useRef<Element>(null);
  //
  // const onDragOver = (event: React.DragEvent<HTMLDivElement>  ) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = 'move';
  // };
  // const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect() || new DOMRect();
  //   const type = event.dataTransfer.getData('application/reactflow');
  //   const position =  reactFlowInstance?.project({
  //     x: event.clientX - reactFlowBounds.left,
  //     y: event.clientY - reactFlowBounds.top,
  //   }) || {x: 0, y: 0};
  //
  //   const newNode = {
  //     id: getId(),
  //     type,
  //     position,
  //     data: { label: `${type} node` },
  //   };
  //   setElements((es: Node) => es.concat(newNode));
  // };

  return (
    <div style={{ height: 1000, width: 1000 }}>
      <ReactFlow elements={props.elements} />
    </div>
  )
}
