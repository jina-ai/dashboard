import React, { ReactNode } from "react"
import Card from "./Card"

type Props = {
  title: ReactNode
  content: string
  icon: string
  theme: string
  link: string
  dataName: string
}

function HelpCard({ title, content, icon, theme, link, dataName }: Props) {
  return (
    <a
      className="unstyled-link"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-name={dataName}
    >
      <Card className="h-full">
        <div className=" flex flex-col pt-3">
          <div className="flex flex-row justify-between mb-8">
            <div>
              <h4 className="text-2xl text-gray-700">{title}</h4>
            </div>
            <div className={`${icon} log-${theme} text-5xl`} />
          </div>
          <div>
            <div className="text-gray-500">{content}</div>
          </div>
        </div>
      </Card>
    </a>
  )
}

export { HelpCard }
