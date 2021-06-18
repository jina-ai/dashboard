import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core"

type Route = {
  pod: string
  pod_id: string
  start_time: string
  end_time?: string
}

type RoutesTableProps = {
  routes: Route[] | undefined
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
    <Card>
      <CardHeader
        title="Routes (List of Pods)"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      {routes && routes?.length && (
        <CardContent>
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
                    <TableCell>
                      {getElapsedTime(start_time, end_time)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  )
}

export default RoutesTable
