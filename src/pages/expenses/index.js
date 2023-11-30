import React, { memo, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import "./expenses.css";
import { useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../../components/api/api";
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
const columns = [
  { id: "slNo", label: "Sl No", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 120 },
  { id: "employeeId", label: "Employee Id", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "submittedDate", label: "Submitted Date", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "view", label: "View", minWidth: 100 },
];


const Expenses = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [claimList, setClaimList] = useState();
  const [isLoading, setIsLoading] =useState(true);
  const [limit, setLimit] =useState(10);
  const [error, setError] = useState(false);
  const { state: email } = useLocation();
  const navigate = useNavigate();
  // Redirect to login page if email state is not present
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
    
  }, [email, navigate]);

  useEffect(()=>{
    getClaimData();
  },[])

  const getClaimData = async(page=0) => {
    try {
      const url = 'claims?page='+page+'&limit='+limit+'&email='+email.email;
      const result = await apiRequest(url, 'GET');
      if(result.data.length > 0){
      setClaimList(result.data);
      setIsLoading(false)
      return true;
      }else{
        setError(true)
        setTimeout(()=>{
          setError(false)
        },3000);
        setIsLoading(false)
        return false
      }
     
    } catch (error) {
      // Handle error
      console.error('Error in POST request:', error);
    }
  };

  const handlePagination = async (page, count) => {
   const data = await getClaimData(page)
   if(data){
    setPage(page);
    setRowsPerPage(count);
   }
  };

  const rows = claimList && claimList.map(item => {
    return {
      ...item,
      view: true 
    };
  });

  const onViewClick = (id) => {
    navigate("/expense-details/"+id, { state: { email } });
  }

  return (
    <div className="expenses-container">
      <div className="accounting-container">
        <div className="accounting-content">
        <div style={{position:"absolute" , top:"60px", left:"22%" }}>
        <Link href={"/"}>Home</Link>
        </div>
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
                        // .slice(
                        //   page * rowsPerPage,
                        //   page * rowsPerPage + rowsPerPage
                        // )
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              style={{
                                border: "1px solid #dddddd",
                                padding: "8px",
                              }}
                            >
                              {index + rowsPerPage}
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
                                <Button
                                  onClick={() => onViewClick(row.claimId)}
                                  variant="contained"
                                  color="primary"
                                >
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
                <div style={{ textAlign: "right", padding: 10 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      handlePagination(page - 1, rowsPerPage - limit);
                    }}
                  >
                    {"<"}
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      handlePagination(page + 1, rowsPerPage + limit);
                    }}
                  >
                    {">"}
                  </Button>
                </div>
              </TableContainer>
            </Paper>
          )}
        </div>
        {error && <Alert severity="error">No Data Found</Alert>}
      </div>
    </div>
  );
};

export default memo(Expenses);
