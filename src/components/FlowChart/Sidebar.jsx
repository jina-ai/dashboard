import React from "react";
import SidebarItem from "./SidebarItem";
import defaultPods from "../../data/defaultPods.json";
import lunr from "lunr";
import { Button, FormControl, Card } from "react-bootstrap";
import { Store } from "../../flux";

class FlowChartSidebar extends React.Component {
  state = {
    availableProperties: Store.getAvailableProperties(),
    node: {},
    searchResults: [],
    searchQuery: "",
  };

  componentWillReceiveProps = (nextProps) => {
    const { selected, nodes } = nextProps.chart;
    const { id, type } = selected;

    if (id === this.state.node.id) return;

    this.setState({ searchResults: [], searchQuery: "" });
    console.log("test");

    if (!id) return;

    if (type === "node" && id != this.state.node.id) {
      const node = nodes[id];
      this.setInitialNode(node);
    }
  };

  setInitialNode = (node) => {
    console.log("setInititailNode:", node);
    const properties = {};
    const newProperties = {};
    const label = node.label;

    Object.keys(node.properties).map((key) => {
      properties[key] = node.properties[key];
    });

    this.setState({ node: { label, id: node.id, properties, newProperties } });
  };

  updateLabel = (label) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.label = label;
      return { node };
    }, this.saveChanges);
  };

  updateExistingValue = (prop, value) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.properties[prop] = value;
      return { node };
    }, this.saveChanges);
  };

  updateNewValue = (prop, value) => {
    this.setState((prevState) => {
      const { node } = prevState;
      node.newProperties[prop] = value;
      return { node };
    }, this.saveChanges);
  };

  saveChanges = () => {
    const { node } = this.state;
    this.props.updateNode(node);
    console.log("save changes: ", node);
  };

  updateSearchQuery = (e) => {
    this.setState({ searchQuery: e.target.value }, this.searchProperties);
  };

  searchProperties = () => {
    const query = this.state.searchQuery;
    console.log("search query: ", query);
    if (!query) return this.setState({ searchResults: false });
    this.indexProperties();
    let searchResults = this.index.search(`${query} ${query}*`);
    this.setState({ searchResults });
    console.log("search results: ", searchResults);
  };

  indexProperties = () => {
    const { availableProperties, node } = this.state;
    const { properties } = node;
    console.log(
      "indexing",
      availableProperties.length,
      "properties for search"
    );
    this.index = lunr(function () {
      this.field("name");

      availableProperties.forEach((prop, idx) => {
        prop.id = parseInt(idx);
        this.add(prop);
      });
    });
  };

  renderEditNode = () => {
    const {
      availableProperties,
      node,
      searchQuery,
      searchResults,
    } = this.state;
    let label =
      typeof node.label === "undefined"
        ? node.properties.name
        : node.label || "";
    return (
      <div className="h-100 d-flex flex-column">
        <div className="p-2 mb-1">
          <p className="mb-1">
            <b>Pod Name</b>
          </p>
          <FormControl
            spellCheck={false}
            value={label}
            onChange={(e) => this.updateLabel(e.target.value)}
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
            onChange={this.updateSearchQuery}
          />
        </div>
        <div className="property-table flex-fill mx-2">
          {searchQuery && searchResults ? (
            searchResults.map((result) => {
              const property = availableProperties[result.ref];
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
                      onChange={(e) =>
                        this.updateNewValue(name, e.target.value)
                      }
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
                    onChange={(e) =>
                      this.updateExistingValue(name, e.target.value)
                    }
                    className="property-value-input"
                  />
                </div>
              );
            })
          ) : (
            <div>
              {Object.keys(node.properties).map((prop) => {
                const value = node.properties[prop];
                if (prop === "name") return;
                return (
                  <div key={prop} className="property-item mb-2">
                    <p className="property-label mb-1">{prop}</p>
                    <FormControl
                      spellCheck={false}
                      value={value || ""}
                      onChange={(e) =>
                        this.updateExistingValue(prop, e.target.value)
                      }
                      className="property-value-input"
                    />
                  </div>
                );
              })}
              {availableProperties.map((property) => {
                if (typeof node.properties[property.name] == "undefined")
                  return (
                    <div key={property.name} className="property-item mb-2">
                      <p className="property-label mb-1">{property.name}</p>
                      <FormControl
                        spellCheck={false}
                        placeholder={property.type}
                        value={node.newProperties[property.name] || ""}
                        onChange={(e) =>
                          this.updateNewValue(property.name, e.target.value)
                        }
                        className="property-value-input"
                      ></FormControl>
                    </div>
                  );
              })}
            </div>
          )}
        </div>
        <div className="p-2">
          <Button
            variant="danger"
            className="w-100"
            onClick={this.props.deleteSelection}
          >
            Delete Pod
          </Button>
        </div>
      </div>
    );
  };

  renderEditLink = (link) => {
    const { nodes, links } = this.props.chart;
    const nodeFrom = nodes[link.from.nodeId];
    const nodeTo = nodes[link.to.nodeId];

    let choices = Object.keys(nodes).map((id) => {
      return { label: nodes[id].label || nodes[id].properties.name, id };
    });

    console.log("links:", links, "\nlink:", link, "\nnodes:", nodes);
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
              onChange={(e) =>
                this.props.updateLink(link.id, e.target.value, nodeTo.id)
              }
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
              onChange={(e) =>
                this.props.updateLink(link.id, nodeFrom.id, e.target.value)
              }
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
          <Button
            variant="danger"
            className="w-100"
            onClick={this.props.deleteSelection}
          >
            Delete Connection
          </Button>
        </div>
      </div>
    );
  };

  renderPodMenu = () => {
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
          {defaultPods.map((pod) => (
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
              properties={pod}
            />
          ))}
        </div>
      </div>
    );
  };

  render = () => {
    const { selected, nodes, links } = this.props.chart;
    const hasSelected = Object.keys(selected).length > 0;
    return (
      <Card className="flowchart-sidebar mb-4">
        {hasSelected
          ? selected.type === "link"
            ? this.renderEditLink(links[selected.id], nodes)
            : this.renderEditNode(nodes[selected.id])
          : this.renderPodMenu()}
      </Card>
    );
  };
}

export default FlowChartSidebar;
