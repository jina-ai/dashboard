import React from "react"
import { Toast } from "react-bootstrap"
import { Banner } from "../../redux/global/global.types"

type Props = {
  data: Banner
  index: number
}

const INITIAL_BANNER_MARGIN = 1
const BANNER_MARGIN_STEP = 7

function getIcon(theme: string) {
  if (theme === "success")
    return <i className="material-icons mr-1">check_circle_outline</i>
  else if (theme === "error")
    return <i className="material-icons mr-1">cerror_outline</i>
  return <i className="material-icons mr-1">warning</i>
}

function InfoToast({ data, index }: Props) {
  if (!data) return null
  const icon = getIcon(data.theme)
  const cssProperties = {
    bottom: String(INITIAL_BANNER_MARGIN + BANNER_MARGIN_STEP * index) + "em",
  }
  return (
    <div
      data-name="connection-notification-online"
      className="notifications-container"
      style={cssProperties}
    >
      <Toast className={`toast-${data.theme} text-white`}>
        <Toast.Header className="text-white" closeButton={false}>
          <strong className="mr-auto">
            {icon}
            <span className="text-uppercase">{data.theme}</span>
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{data.message}</Toast.Body>
      </Toast>
    </div>
  )
}

export { InfoToast }
