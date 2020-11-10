import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import defaultPods from "../../data/defaultPods.json";
import _ from "lodash";
import { IChart, ILink, INode } from "@bastinjafari/react-flow-chart";
import { Button, FormControl, Card } from "react-bootstrap";

interface Node extends INode {
  label?: string;
}

type ParsedNode = {
  label: string;
  id: string;
  properties: { [key: string]: string | number };
  newProperties: { [key: string]: string | number };
};

type NodesObject = {
  [key: string]: Node;
};

const parseNode = (node: Node): ParsedNode => {
  const properties = { ...node.properties };
  const newProperties = {};
  const label = node.label || "";

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
  link: ILink;
  nodes: NodesObject;
  updateLink: (
    linkId: string,
    nodeFrom: string,
    nodeTo: string | undefined
  ) => void;
  deleteSelection: () => void;
};

function EditLink({ link, nodes, updateLink, deleteSelection }: EditLinkProps) {
  let nodeFromId = link.from.nodeId;
  let nodeToId = link.to.nodeId;

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
            onChange={(e) => updateLink(link.id, e.target.value, nodeToId)}
            value={nodeFromId}
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
            onChange={(e) => updateLink(link.id, nodeFromId, e.target.value)}
            value={nodeToId}
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

type PropertyItem = {
  name: string;
  type: string;
};

type EditNodeProps = {
  node: ParsedNode;
  availableProperties: PropertyItem[];
  updateLabel: (label: string) => void;
  updateNewValue: (key: string, value: string | number) => void;
  updateExistingValue: (key: string, value: string | number) => void;
  deleteSelection: () => void;
};

function EditNode({
  node,
  updateLabel,
  updateNewValue,
  updateExistingValue,
  deleteSelection,
  availableProperties,
}: EditNodeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(
    availableProperties
  );

  const updateSearchQuery = (searchString: string) => {
    setSearchQuery(searchString);
  };

  useEffect(() => {
    const results = availableProperties.filter((property: any) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(results);
  }, [searchQuery, availableProperties]);

  useEffect(() => {
    setSearchQuery("");
    setFilteredProperties(availableProperties);
  }, [node.id, availableProperties]);

  let label = node.label || node.properties.name;

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
          onChange={(e) => updateSearchQuery(e.target.value)}
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
                  type={type === "int" ? "number" : "text"}
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
                placeholder={type}
                type={type === "int" ? "number" : "text"}
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
  chart: IChart;
  duplicateFlow: () => void;
  updateNode: (updates: any) => void;
  deleteSelection: () => void;
  updateLink: (
    linkId: string,
    nodeFromId: string,
    nodeToId: string | undefined
  ) => void;
  availableProperties: PropertyItem[];
};

function FlowChartSidebar({
  readonly,
  chart,
  duplicateFlow,
  deleteSelection,
  updateNode,
  updateLink,
  availableProperties,
}: FlowChartSidebarProps) {
  const {
    selected: { id: selectedId, type: selectedType },
    nodes,
    links,
  } = chart;

  const [node, setNode] = useState<ParsedNode | undefined>();

  useEffect(() => {
    let node;
    if (!selectedId) return;
    const selectedNode = nodes[selectedId];
    if (selectedNode) node = parseNode(selectedNode);
    setNode(node);
  }, [nodes, selectedId]);

  function updateLabel(label: string) {
    updateNode({
      ...node,
      label,
    });
  }

  function updateNewValue(key: string, value: any) {
    if (!node) return;
    let newNode = _.cloneDeep(node);
    newNode.newProperties[key] = value;
    updateNode({
      ...newNode,
    });
  }

  function updateExistingValue(key: string, value: any) {
    if (!node) return;
    let newNode = _.cloneDeep(node);
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
              availableProperties={availableProperties}
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
