import React from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSelectedWorkspaceId,
  selectWorkspaces,
} from "../../redux/flows/flows.selectors"
import { selectConnectionStatus } from "../../redux/global/global.selectors"
import {
  createNewWorkspace,
  deleteWorkspace,
  loadWorkspace,
} from "../../redux/flows/flows.actions"
import { isFeatureEnabled } from "../../helpers/featureSwitch"
import { multiModalScript } from "../../services/multiModalScript"

const FALLBACK_WORKSPACE_NAME = "Untitled workspace"

type ConnectionIndicatorProps = {
  connected: boolean
  show: boolean
}

function ConnectionIndicator({ connected, show }: ConnectionIndicatorProps) {
  if (!show) return null
  return connected ? (
    <i className="material-icons ml-2 text-success">wifi</i>
  ) : (
    <i className="material-icons ml-2 text-warning">wifi_off</i>
  )
}

function TitleConnectionIndicator({
  connected,
  show,
}: ConnectionIndicatorProps) {
  if (!show) return null
  return connected ? (
    <i className="material-icons text-white ml-1 mr-2">wifi</i>
  ) : (
    <i className="material-icons text-warning ml-1 mr-2">wifi_off</i>
  )
}

type DeleteWorkspaceProps = {
  onClick: () => void
  idx: number
}

function DeleteButton({ onClick, idx }: DeleteWorkspaceProps) {
  const Delete = styled.div`
    cursor: pointer;
    font-size: 1.15rem;
    position: absolute;
    top: 0;
    right: 0;
  `
  return (
    <Delete>
      <i
        data-name={`deleteWorkspaceButton-${idx}`}
        onClick={onClick}
        className="material-icons"
      >
        delete
      </i>
    </Delete>
  )
}

export default function WorkspaceSelection() {
  const workspaces = useSelector(selectWorkspaces)
  const selectedWorkspaceId = useSelector(selectSelectedWorkspaceId)
  const connected = useSelector(selectConnectionStatus)
  const { palette } = useTheme()

  const dispatch = useDispatch()

  const WorkspaceSelectionMenu = styled.div`
    font-family: "Montserrat", serif;
    width: 12rem;
    margin-right: 1.5rem;
  `

  const SelectedWorkspaceHeader = styled.div`
    position: relative;
    font-weight: 600;
    font-size: 1.25em;
    color: ${palette.headerTextColor};
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
  `

  type WorkspaceTabProps = {
    selected: boolean
  }

  const WorkspaceTab = styled.div`
    cursor: pointer;
    font-weight: ${(props: WorkspaceTabProps) =>
      props.selected ? "bold" : 500};
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 1rem;
    margin-bottom: 1rem;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
  `

  const WorkspaceTabOverflowHider = styled.div`
    position: absolute;
    height: 1.75rem;
    width: 2rem;
    top: 0;
    right: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      ${palette.bodyBackground} 40%
    );
  `

  const WorkspaceHeader = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 1rem;
    color: ${palette.headerTextColor};
  `

  const SubHeader = styled.div`
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 0.5rem;
    color: ${palette.headerTextColor};
  `

  const AddButton = styled.span`
    float: right;
    cursor: pointer;
  `

  const FilesList = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    height: 10rem;
    overflow-y: auto;
    overflow-x: hidden;
  `

  const FileItem = styled.div`
    font-weight: 400;
    font-size: 0.85rem;
    padding-top: 0.15rem;
    padding-bottom: 0.15rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    position: relative;
  `

  const FileIcon = styled.span`
    opacity: 0.5;
    margin-right: 0.25em;
  `

  const userWorkspaces = Object.entries(workspaces).filter(
    ([id, workspace]) => workspace.type !== "example"
  )

  const exampleWorkspaces = Object.entries(workspaces).filter(
    ([id, workspace]) => workspace.type === "example"
  )

  const currentWorkspace = workspaces[selectedWorkspaceId]

  const FilesListComponent = () => (
    <FilesList>
      {/* TODO: map over actual files, delete actual files */}
      <FileItem>
        <FileIcon>
          <i className="material-icons">file_present</i>
        </FileIcon>
        <span>py_modules.py</span>
        <WorkspaceTabOverflowHider />
      </FileItem>

      <FileItem>
        <FileIcon>
          <i className="material-icons">file_present</i>
        </FileIcon>
        <span>py_modules.py</span>
        <WorkspaceTabOverflowHider />
      </FileItem>

      <FileItem>
        <FileIcon>
          <i className="material-icons">file_present</i>
        </FileIcon>
        <span>py_modules.py</span>
        <WorkspaceTabOverflowHider />
      </FileItem>
    </FilesList>
  )

  return (
    <WorkspaceSelectionMenu>
      <SelectedWorkspaceHeader>
        {currentWorkspace.name || <i>{FALLBACK_WORKSPACE_NAME}</i>}
        <TitleConnectionIndicator
          show={currentWorkspace.type === "remote"}
          connected={connected}
        />
      </SelectedWorkspaceHeader>

      <SubHeader>
        Files{" "}
        <AddButton onClick={() => {}}>
          <i className="material-icons">add</i>
        </AddButton>
      </SubHeader>
      {isFeatureEnabled("FILES") && <FilesListComponent />}
      <WorkspaceHeader>
        My Workspaces
        <AddButton
          data-name={"newWorkspaceButton"}
          onClick={() => dispatch(createNewWorkspace())}
        >
          <i className="material-icons">add</i>
        </AddButton>
      </WorkspaceHeader>

      {userWorkspaces.map(([workspaceId, workspace], idx) => (
        <WorkspaceTab selected={selectedWorkspaceId === workspaceId} key={idx}>
          <span
            data-name={`${workspace.name.replaceAll(" ", "")}`}
            onClick={() => dispatch(loadWorkspace(workspaceId))}
          >
            {workspace.name || FALLBACK_WORKSPACE_NAME}
          </span>
          <ConnectionIndicator
            show={workspace.type === "remote"}
            connected={connected}
          />
          <WorkspaceTabOverflowHider />
          <DeleteButton
            idx={idx}
            onClick={() => dispatch(deleteWorkspace(workspaceId))}
          />
        </WorkspaceTab>
      ))}
      <WorkspaceHeader>Example Workspaces</WorkspaceHeader>
      {exampleWorkspaces.map(([workspaceId, workspace], idx) => (
        <WorkspaceTab
          data-name={`exampleWorkspaceButton-${idx}`}
          selected={selectedWorkspaceId === workspaceId}
          onClick={() => dispatch(loadWorkspace(workspaceId))}
          key={idx}
        >
          {workspace.name}
        </WorkspaceTab>
      ))}

      <WorkspaceTab selected={false} onClick={multiModalScript}>
        Multi-Modal-Example
      </WorkspaceTab>
    </WorkspaceSelectionMenu>
  )
}
