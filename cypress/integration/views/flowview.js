
import { Store } from "../../../src/flux";

describe('The Flow Page', () => {
  beforeEach(() => {
    cy.visit('/#/flow')
  })

  context('When the dev server is connected', () => {

    it('should display the connection', () => {
      cy.get('.mr-4 > .mb-0').contains('Logserver connection established at http://localhost:5000')
    })

    it('should render Network Flow correctly', () => {
      cy.get('.dropdown-toggle').click()
      cy.get('.dropdown-menu > :nth-child(3)').click().then(() => {
        const chart = Store.getFlowchart()
        testChartRender(chart)
      })
    })
  })

  context('When a new flow is created', () => {

  it('successfully let you pull new pods', () => {
      cy.get('.dropdown-toggle').click()
      cy.get('.dropdown-menu > :nth-child(1)').click().then(() => {
        cy.get('.p-3').children().each(($el) => {
          const dataTransfer = new DataTransfer;
          cy.wrap($el).trigger('dragstart', { dataTransfer, force: true })
          cy.get('.chart-section-container').trigger('drop', { dataTransfer });
        })
      })
    })
  })
})

function testNodeProperties(nodeProperties, nodeName)  {
  const nodePropertyNames = Object.keys(nodeProperties)
  nodePropertyNames.forEach((property) => {
    if(typeof nodeProperties[property] === 'boolean') {
      cy.get(`#chart-node-${nodeName} > .node-info`).contains(property + ':') //booleans should just get displayed as property names like 'log_see:'
    }
    else {
      cy.get(`#chart-node-${nodeName} > .node-info`).contains(property + ':' + nodeProperties[property]) //for example yaml_path: /usr/local...
    }
  })
}

function testChartRender(chart) {
  const nodes = chart.flow.nodes
  const nodeNames = Object.keys(nodes)
  nodeNames.forEach((nodeName) => {
    cy.get(`#chart-node-${nodeName}`).then(() => {
      cy.get(`#chart-node-${nodeName} > .node-header > .p-1`).contains(nodeName)  //test if nodeName is in Header
      cy.get("body").then($body => {
        if ($body.find(`#chart-node-${nodeName} > .node-info`).length > 0) {
          const nodeProperties = nodes[nodeName].properties
          testNodeProperties(nodeProperties, nodeName)
        }
      });
    })
  })
}
