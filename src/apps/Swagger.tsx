import React from "react"

import { SwaggerLayout } from "../layouts/SwaggerLayout"
import SwaggerView from "../views/SwaggerView"

import "swagger-ui-react/swagger-ui.css"

const Swagger = () => {
  document.title = "Jina Debug"
  return (
    <SwaggerLayout>
      <SwaggerView />
    </SwaggerLayout>
  )
}

export default Swagger
