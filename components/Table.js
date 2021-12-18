import BTable from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import { Button } from "react-bootstrap";

export default function Table({ columns, data, handleDelete }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  return (
    <>
      <BTable responsive size="sm" {...getTableProps()}>
        <thead style={{ backgroundColor: "lightgray" }} className="text-center">
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  key={j}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ borderColor: "lightslategray" }}
                >
                  {column.render("Header")}
                  <span>
                    {`${
                      column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""
                    }`}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-end">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, j) => (
                  <td key={j} {...cell.getCellProps()}>
                    {j === 0 && handleDelete && (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(i)}
                      >
                        x
                      </Button>
                    )}
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </BTable>
      <br />
    </>
  );
}
