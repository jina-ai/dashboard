import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

type Route = {
  pod: string
  pod_id: string
  start_time: string
  end_time?: string
}

type RoutesTableProps = {
  routes: Route[]
}

const getElapsedTime = (
  startTime: string,
  endTime: string | undefined
): string => {
  if (!startTime || !endTime) return "Process is still ongoing"

  const startDate = new Date(startTime)
  const endDate = new Date(endTime)

  return `${Math.floor(endDate.getTime() - startDate.getTime())} ms`
}

const RoutesTable = ({ routes }: RoutesTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pod</TableCell>
          <TableCell>Pod Id</TableCell>
          <TableCell>Start time</TableCell>
          <TableCell>End time</TableCell>
          <TableCell>Elapsed Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {routes.map((route) => {
          const { pod_id, pod, start_time, end_time } = route
          return (
            <TableRow key={pod_id}>
              <TableCell> {pod} </TableCell>
              <TableCell>{pod_id}</TableCell>
              <TableCell>{start_time}</TableCell>
              <TableCell>{end_time}</TableCell>
              <TableCell>{getElapsedTime(start_time, end_time)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default RoutesTable
