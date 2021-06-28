// Layout Types
import { SwaggerLayout } from "../layouts"

// Route Views
import SwaggerView from "../views/SwaggerView"

export type SwaggerRoute = {
  path: string
  exact?: boolean
  layout: ({ children }: { children: any }) => JSX.Element
  component: () => JSX.Element
  props?: {
    usesConnection?: boolean
    usesAuth?: boolean
    navigateButton?: () => JSX.Element
  }
}

export const swaggerRoutes: SwaggerRoute[] = [
  {
    path: "/",
    exact: true,
    layout: SwaggerLayout,
    component: SwaggerView,
  },
]
