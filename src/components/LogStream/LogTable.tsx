/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { FixedSizeList, areEqual } from "react-window";
import { ProcessedLog } from "../../flux/tranformLog";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

type ColumnsType<RecordType extends Record<string, number | string | Date>> = {
  headerLabel: string;
  accessor: keyof RecordType;
}[];
type TableProps<GenericData extends Record<string, any>> = {
  showLogDetails: (arg0: any) => void;
  columns: Readonly<ColumnsType<GenericData>>;
  height?: number;
  data: ProcessedLog[];
  [key: string]: any;
};

const ROW_HEIGHT = 28;

const Row = React.memo(
  ({ index, showLogDetails, data: { data, columns }, style, ...rest }: any) => {
    const datum = data[index];

    return (
      <TableRow
        component="div"
        style={{ ...style, minHeight: ROW_HEIGHT }}
        css={{ display: "flex", flexDirection: "row" }}
      >
        {columns.map((col: any) => (
          <TableCell
            key={col.accessor}
            col={col}
            component="div"
            variant="body"
            onClick={() => showLogDetails(data[index])}
            {...col.cellProps}
            css={{
              ...col.css,
              minHeight: ROW_HEIGHT,
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            <span css={{ fontFamily: "Roboto Mono", wordWrap: "break-word" }}>
              {datum[col.accessor]}
            </span>
          </TableCell>
        ))}
      </TableRow>
    );
  },
  areEqual
);
const Header = ({ columns }: any) => {
  return (
    <TableHead component="div" css={{ display: "block", width: "100%" }}>
      <TableRow component="div" css={{ display: "flex" }}>
        {columns.map((col: any) => (
          <TableCell
            key={col.accessor}
            component="div"
            variant="head"
            {...col.cellProps}
            css={{ ...col.css }}
          >
            {col.headerLabel}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function LogTable<T extends Record<string, any>>({
  data,
  columns,
}: TableProps<T>) {
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver });
  return (
    <MaUTable ref={ref} component="div">
      <Header columns={columns} />
      <TableBody
        component="div"
        css={{
          display: "block",
          flex: "1 2 auto",
        }}
      >
        <FixedSizeList
          height={height}
          width="100%"
          itemCount={data.length}
          itemSize={ROW_HEIGHT}
          itemData={{ data, columns }}
        >
          {Row}
        </FixedSizeList>
      </TableBody>
    </MaUTable>
  );
}
export { LogTable };
