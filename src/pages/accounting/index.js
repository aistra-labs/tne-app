import React, { memo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./accounting.css";

const columns = [
  { id: "date", label: "Date", minWidth: 120 },
  { id: "acctCode", label: "Acct code", minWidth: 100 },
  { id: "entryType", label: "Entry Type", minWidth: 150 },
  { id: "debit", label: "Debit", minWidth: 120 },
  { id: "credit", label: "Credit", minWidth: 120 },
  { id: "narration", label: "Narration", minWidth: 160 },
];

const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push([
      {
        date: "25th Oct 2023",
        acctCode: `xxxx${i}`,
        entryType: "Provisional Expense",
        debit: "8000",
        credit: "",
        narration:
          "Booking done. Mr Raj Singh. Raj.singh@gmail.com. 8220393456",
      },
      {
        date: "",
        acctCode: `yyyy${i}`,
        entryType: "Provisional Liability",
        debit: "",
        credit: "8000",
        narration: "",
      },
    ]);
  }
  return data;
};

const rows = generateTableData();

const Accounting = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="accounting-container">
      <div className="accounting-content">
        <h1>Accounting Entries</h1>
        <Paper sx={{ width: "85%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{ borderCollapse: "collapse", minWidth: "600px" }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{
                        minWidth: column.minWidth,
                        border: "1px solid #dddddd",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell
                          align="center"
                          rowSpan={2}
                          style={{
                            border: "1px solid #dddddd",
                            padding: "8px",
                          }}
                        >
                          {row[0].date}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #dddddd",
                            padding: "8px",
                          }}
                        >
                          {row[0].acctCode}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #dddddd",
                            padding: "8px",
                          }}
                        >
                          {row[0].entryType}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #dddddd",
                            padding: "8px",
                          }}
                        >
                          {row[0].debit}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #dddddd",
                            padding: "8px",
                          }}
                        >
                          {row[0].credit}
                        </TableCell>
                        <TableCell
                          align="left"
                          rowSpan={2}
                          style={{
                            border: "1px solid #dddddd",
                            padding: "18px",
                          }}
                        >
                          {row[0].narration}
                        </TableCell>
                      </TableRow>
                      {row.slice(1).map((rowEntry) => {
                        return (
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {rowEntry.acctCode}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {rowEntry.entryType}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {rowEntry.debit}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {rowEntry.credit}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default memo(Accounting);
