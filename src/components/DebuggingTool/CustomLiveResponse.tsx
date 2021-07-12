import styled from "@emotion/styled"
import React, { useState } from "react"
import { PropertyList } from "./FlowChartNodes"

const Headers = ({ headers }: any) => {
  return (
    <div>
      <h5>Response headers</h5>
      <pre className="microlight">{headers}</pre>
    </div>
  )
}

const Duration = ({ duration }: { duration: string | number }) => {
  return (
    <div>
      <h5>Request duration</h5>
      <pre className="microlight">{duration} ms</pre>
    </div>
  )
}

type Props = {
  response: any
  path: string
  method: string
  displayRequestDuration: boolean
  specSelectors: { [key: string]: any }
  getComponent: any
  getConfigs: any
}

const ListContainer = styled.div`
  background: white;
  padding: 1em;
  border-radius: 0.25em;
`

const LiveResponse = (props: Props) => {
  const {
    response,
    getComponent,
    getConfigs,
    displayRequestDuration,
    specSelectors,
    path,
    method,
  } = props
  const { showMutatedRequest, requestSnippetsEnabled } = getConfigs()
  const [currentTab, setCurrentTab] = useState("raw")

  const curlRequest = showMutatedRequest
    ? specSelectors.mutatedRequestFor(path, method)
    : specSelectors.requestFor(path, method)
  const status = response.get("status")
  const url = curlRequest.get("url")
  const headers = response.get("headers").toJS()
  const notDocumented = response.get("notDocumented")
  const isError = response.get("error")
  const body = response.get("text")
  const duration = response.get("duration")
  const headersKeys = Object.keys(headers)
  const contentType = headers["content-type"] || headers["Content-Type"]

  const RawResponse = getComponent("responseBody")
  const CustomResponse = getComponent("debugResponse")
  const returnObject = headersKeys.map((key) => {
    var joinedHeaders = Array.isArray(headers[key])
      ? headers[key].join()
      : headers[key]
    return (
      <span className="headerline" key={key}>
        {" "}
        {key}: {joinedHeaders}{" "}
      </span>
    )
  })
  const hasHeaders = returnObject.length !== 0
  const Markdown = getComponent("Markdown", true)
  const RequestSnippets = getComponent("RequestSnippets", true)
  const Curl = getComponent("curl")

  return (
    <div>
      {curlRequest &&
        (requestSnippetsEnabled === true ||
        requestSnippetsEnabled === "true" ? (
          <RequestSnippets request={curlRequest} />
        ) : (
          <Curl request={curlRequest} getConfigs={getConfigs} />
        ))}
      {url && (
        <div>
          <h4>Request URL</h4>
          <div className="request-url">
            <pre className="microlight">{url}</pre>
          </div>
        </div>
      )}
      <h4>Server response</h4>
      <table
        className="responses-table live-responses-table"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr className="responses-header">
            <td className="col_header response-col_status">Code</td>
            <td
              className="col_header response-col_description"
              style={{ paddingLeft: "75px" }}
            >
              Details
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="response">
            <td className="response-col_status">
              {status}
              {notDocumented ? (
                <div className="response-undocumented">
                  <i> Undocumented </i>
                </div>
              ) : null}
            </td>

            <td
              className="response-col_description"
              style={{ paddingLeft: "75px" }}
            >
              <div className="tab-header">
                <div
                  onClick={() => setCurrentTab("raw")}
                  className={`tab-item ${currentTab === "raw" && "active"}`}
                >
                  <h4 className="opblock-title">
                    <span>Raw</span>
                  </h4>
                </div>

                <div
                  onClick={() => setCurrentTab("list")}
                  className={`tab-item ${currentTab === "list" && "active"}`}
                >
                  <h4 className="opblock-title">
                    <span>List</span>
                  </h4>
                </div>

                <div
                  onClick={() => setCurrentTab("visual")}
                  className={`tab-item ${currentTab === "visual" && "active"}`}
                >
                  <h4 className="opblock-title">
                    <span>Visual</span>
                  </h4>
                </div>
              </div>
              {isError ? (
                <Markdown
                  source={`${
                    response.get("name") !== ""
                      ? `${response.get("name")}: `
                      : ""
                  }${response.get("message")}`}
                />
              ) : null}

              {body ? (
                <>
                  {currentTab === "raw" && (
                    <RawResponse
                      content={body}
                      contentType={contentType}
                      url={url}
                      headers={headers}
                      getConfigs={getConfigs}
                      getComponent={getComponent}
                    />
                  )}
                  {currentTab === "visual" && (
                    <CustomResponse response={JSON.parse(body)} />
                  )}
                  {currentTab === "list" && (
                    <>
                      <h5>Response body</h5>
                      <ListContainer>
                        <PropertyList data={JSON.parse(body)} />
                      </ListContainer>
                    </>
                  )}
                </>
              ) : null}

              {hasHeaders ? <Headers headers={returnObject} /> : null}
              {displayRequestDuration && duration ? (
                <Duration duration={duration} />
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LiveResponse
