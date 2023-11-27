import React, { memo, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./expenses.css";
import usePostApi from "../../components/usePostApi";
import { useLocation, useNavigate } from "react-router-dom";

const columns = [
  { id: "slNo", label: "Sl No", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 120 },
  { id: "employeeId", label: "Employee Id", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "submittedDate", label: "Submitted Date", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];

const formatDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  
  const day = new Date(date).getDate();
  const suffix = day >= 11 && day <= 13 ? "th" : { 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th";
  
  const formattedWithSuffix = formattedDate.replace(/\d+/, (day) => `${day}${suffix}`);
  const [month, dayWithoutSuffix, year] = formattedWithSuffix.split(' ');

  return `${dayWithoutSuffix} ${month} ${year}`;
};

const generateTableData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      slNo: i,
      name: `Employee ${i}`,
      employeeId: `EMP${i}`,
      role: `Role ${i}`,
      submittedDate: formatDate(`2023-11-${i}`),
      status: i % 2 === 0 ? "Approved" : "Pending",
      view: true,
    });
  }
  return data;
};

const rows = generateTableData();

const Expenses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageData, setPageData] = useState({
    page: 0,
    limit: 10,
  });

  const { state: email } = useLocation();
  const navigate = useNavigate();

  // Redirect to login page if email state is not present
  useEffect(() => {
    console.log('expenses email', email);
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const apiUrl = "http://51.112.12.168:8080/tne/api/v1/account/ledger";

  const { response, error, isLoading } = usePostApi(apiUrl, pageData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onViewClick = () => {
    navigate("/expense-details", { state: { email } });
  }

  return (
    <div className="expenses-container">
      <div className="accounting-container">
        <div className="accounting-content">
          <h1 className="expense-title">Expense Approvals</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                    {rows &&
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {row.slNo}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {row.employeeId}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {row.role}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "18px",
                              }}
                            >
                              {row.submittedDate}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "18px",
                              }}
                            >
                              {row.status}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "18px",
                              }}
                            >
                              {row.view ? (
                                <Button onClick={onViewClick} variant="contained" color="primary">
                                  View
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows && rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Expenses);
