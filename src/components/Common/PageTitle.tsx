import React from "react"
import classNames from "classnames"

type Props = {
  title: string
  subtitle?: string
  className: string
}

function PageTitle({ title, subtitle, className }: Props) {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  )

  return (
    <div className={classes}>
      <h3 className="page-title" data-name="title">
        {title}
      </h3>
      <p className="page-subtitle mt-2 mb-0">{subtitle}</p>
    </div>
  )
}

export { PageTitle }
