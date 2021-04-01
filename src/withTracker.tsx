import React from "react"
import GoogleAnalytics from "react-ga"

GoogleAnalytics.initialize(process.env.REACT_APP_GAID || "UA-164627626-1", {
  testMode: process.env.NODE_ENV === "test",
})

const withTracker = (
  WrappedComponent: (props: any) => JSX.Element,
  options = {}
): typeof React.Component => {
  const trackPage = (page: string) => {
    if (process.env.NODE_ENV !== "production") {
      return
    }

    GoogleAnalytics.set({
      page,
      ...options,
    })
    GoogleAnalytics.pageview(page)
  }

  const BASENAME = process.env.REACT_APP_BASENAME || ""

  type PrevProps = { location: { pathname: string; search: string } }
  // eslint-disable-next-line
  const HOC = class extends React.Component<PrevProps, string> {
    componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search
      trackPage(`${BASENAME}${page}`)
    }

    componentDidUpdate(prevProps: PrevProps) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search
      const nextPage = this.props.location.pathname + this.props.location.search

      if (currentPage !== nextPage) {
        trackPage(`${BASENAME}${nextPage}`)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return (HOC as unknown) as typeof React.Component
}

export default withTracker
