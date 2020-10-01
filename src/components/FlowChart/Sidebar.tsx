import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import defaultPods from "../../data/defaultPods.json";
import { Button, FormControl, Card } from "react-bootstrap";
import { Store } from "../../flux";

type Node = {
  id: string;
  label: string;
  orientation?: number;
  readonly?: boolean;
  ports: {
    [id: string]: { id: string; type: string };
  };
  position: { x: number; y: number };
  properties: { [key: string]: any };
  newProperties: { [key: string]: any };
  size: { width: number; height: number };
};

type Link = {
  from: { nodeId: string; portId: string };
  to: { nodeId: string; portId: string };
  id: string;
};

type NodesObject = {
  [key: string]: Node;
};

type LinksObject = {
  [key: string]: Link;
};

type Chart = {
  offset: { x: number; y: number };
  nodes: NodesObject;
  links: LinksObject;
  scale: number;
  selected: { id?: string; type?: string };
  hovered: { id?: string; type?: string };
};

const parseNode = (node: Node) => {
  const properties = { ...node.properties };
  const newProperties = {};
  const label = node.label;

  return { label, id: node.id, properties, newProperties };
};

function ReadOnly({ duplicateFlow }: { duplicateFlow: () => void }) {
  return (
    <div className="readonly-overlay py-4 px-4 text-center">
      <h4 className="my-4">
        <b>
          This flow is <span className="text-muted">readonly</span>
        </b>
      </h4>
      <p className="my-4">To edit this flow, please duplicate it.</p>
      <Button onClick={duplicateFlow}>Duplicate Flow</Button>
    </div>
  );
}

type EditLinkProps = {
  link: Link;
  nodes: NodesObject;
  updateLink: (linkId: string, nodeFrom: string, nodeTo: string) => void;
  deleteSelection: () => void;
};

function EditLink({ link, nodes, updateLink, deleteSelection }: EditLinkProps) {
  const nodeFrom = nodes[link.from.nodeId];
  const nodeTo = nodes[link.to.nodeId];

  let choices = Object.keys(nodes).map((id) => {
    return { label: nodes[id].label || nodes[id].properties.name, id };
  });

  return (
    <div className="h-100 d-flex flex-column">
      <h5 className="px-3 py-2 mb-0 border-bottom">
        <b>Edit Connection</b>
      </h5>
      <div className="flex-fill px-2">
        <div className="p-2 mb-1">
          <p className="mb-1">
            <b>From</b>
          </p>
          <FormControl
            className="mb-2"
            as="select"
            onChange={(e) => updateLink(link.id, e.target.value, nodeTo.id)}
            value={nodeFrom.id}
          >
            {choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </FormControl>
          <p className="mb-1">
            <b>To</b>
          </p>
          <FormControl
            className="mb-2"
            as="select"
            onChange={(e) => updateLink(link.id, nodeFrom.id, e.target.value)}
            value={nodeTo.id}
          >
            {choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </FormControl>
        </div>
      </div>
      <div className="p-2">
        <Button variant="danger" className="w-100" onClick={deleteSelection}>
          Delete Connection
        </Button>
      </div>
    </div>
  );
}

type EditNodeProps = {
  node: Node;
  updateLabel: (label: string) => void;
  updateNewValue: (key: string, value: any) => void;
  updateExistingValue: (key: string, value: any) => void;
  deleteSelection: () => void;
};

function EditNode({
  node,
  updateLabel,
  updateNewValue,
  updateExistingValue,
  deleteSelection,
}: EditNodeProps) {
  const availableProperties = Store.getAvailableProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(
    availableProperties
  );

  const updateSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const availableProperties = Store.getAvailableProperties();
    const results = availableProperties.filter((property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(results);
  }, [searchQuery]);

  useEffect(() => {
    const availableProperties = Store.getAvailableProperties();
    setSearchQuery("");
    setFilteredProperties(availableProperties);
  }, [node.id]);

  let label =
    typeof node.label === "undefined" ? node.properties.name : node.label || "";

  return (
    <div className="h-100 d-flex flex-column">
      <div className="p-2 mb-1">
        <p className="mb-1">
          <b>Pod Name</b>
        </p>
        <FormControl
          spellCheck={false}
          value={label}
          onChange={(e) => updateLabel(e.target.value)}
          className="pod-name-input"
        />
      </div>
      <p className="mb-0 px-2">
        <b>Properties</b>
      </p>
      <div className="m-2">
        <FormControl
          spellCheck={false}
          placeholder="search properties..."
          value={searchQuery}
          onChange={updateSearchQuery}
        />
      </div>
      <div className="property-table flex-fill mx-2">
        {filteredProperties.map((property) => {
          const { name, type } = property;
          const value = node.properties[name];

          if (typeof value == "undefined")
            return (
              <div key={name} className="property-item mb-2">
                <p className="property-label mb-1">{name}</p>
                <FormControl
                  spellCheck={false}
                  placeholder={type}
                  value={node.newProperties[name] || ""}
                  onChange={(e) => updateNewValue(name, e.target.value)}
                  className="property-value-input"
                ></FormControl>
              </div>
            );
          return (
            <div key={name} className="property-item mb-2">
              <p className="property-label mb-1">{name}</p>
              <FormControl
                spellCheck={false}
                value={value || ""}
                onChange={(e) => updateExistingValue(name, e.target.value)}
                className="property-value-input"
              />
            </div>
          );
        })}
      </div>
      <div className="p-2">
        <Button variant="danger" className="w-100" onClick={deleteSelection}>
          Delete Pod
        </Button>
      </div>
    </div>
  );
}

function PodMenu() {
  return (
    <div className="d-flex flex-column h-100">
      <h5 className="px-3 py-2 mb-0 border-bottom">
        <b>Add Pods</b>
      </h5>
      <div className="p-3 scrollable flex-fill">
        <SidebarItem
          ports={{
            inPort: {
              id: "inPort",
              type: "input",
            },
            outPort: {
              id: "outPort",
              type: "output",
            },
          }}
          properties={{}}
        />
        {defaultPods.map((pod, idx) => (
          <SidebarItem
            key={idx}
            ports={{
              inPort: {
                id: "inPort",
                type: "input",
              },
              outPort: {
                id: "outPort",
                type: "output",
              },
            }}
            properties={pod}
          />
        ))}
      </div>
    </div>
  );
}

type FlowChartSidebarProps = {
  readonly: boolean;
  chart: Chart;
  node: Node;
  updateLabel: (label: string) => void;
  updateNewValue: (key: string, value: any) => void;
  updateExistingValue: (key: string, value: any) => void;
  deleteSelection: () => void;
};

function FlowChartSidebar({
  readonly,
  chart,
  duplicateFlow,
  deleteSelection,
  updateNode,
  updateLink,
}: any) {
  const {
    selected: { id: selectedId, type: selectedType },
    nodes,
    links,
  } = chart;

  const [node, setNode]: [any, any] = useState(null);

  useEffect(() => {
    let node;
    const selectedNode = nodes[selectedId];
    if (selectedNode) node = parseNode(nodes[selectedId]);
    setNode(node);
  }, [nodes, selectedId]);

  function updateLabel(label: string) {
    updateNode({
      ...node,
      label,
    });
  }

  function updateNewValue(key: string, value: any) {
    let newNode = { ...node };
    newNode.newProperties[key] = value;
    updateNode({
      ...newNode,
    });
  }

  function updateExistingValue(key: string, value: any) {
    let newNode = { ...node };
    newNode.properties[key] = value;
    updateNode({
      ...newNode,
    });
  }

  return (
    <Card className="flowchart-sidebar mb-4">
      {selectedId ? (
        selectedType === "link" ? (
          <EditLink
            nodes={nodes}
            link={links[selectedId]}
            updateLink={updateLink}
            deleteSelection={deleteSelection}
          />
        ) : (
          node && (
            <EditNode
              node={node}
              updateLabel={updateLabel}
              updateNewValue={updateNewValue}
              updateExistingValue={updateExistingValue}
              deleteSelection={deleteSelection}
            />
          )
        )
      ) : (
        <PodMenu />
      )}
      {readonly && <ReadOnly duplicateFlow={duplicateFlow} />}
    </Card>
  );
}

export default FlowChartSidebar;
