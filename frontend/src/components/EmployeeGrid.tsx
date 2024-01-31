import { Employee } from "../types/Employee/Employee.type";
import EmployeeCard from "./EmployeeCard/EmployeeCard";
import { Grid } from "@mui/material";
import { useGetEmployeesByPageQuery } from "../features/employee/employeeApi";
import { useAppSelector } from "../hooks/hooks";

const EmployeeGrid = () => {
  const page = useAppSelector((state) => state.employeePagination.page);
  const userType =
    useAppSelector((state) => state.auth.user.department_id) || -1;
  const { data } = useGetEmployeesByPageQuery({
    pageNumber: page,
    type: userType,
  });
  const employeeArray: Employee[] = data?.employeePagination.currentPage || [];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{ height: "50%", width: "80%", marginTop: "10px" }}
        spacing={4}
      >
        {employeeArray.length > 0 ? (
          employeeArray.map((employee, index) => (
            <Grid item key={index} xs={12} md={6} justifyContent={"center"}>
              <EmployeeCard employee={employee} />
            </Grid>
          ))
        ) : (
          <div>No Employee Found</div>
        )}
      </Grid>
    </div>
  );
};

export default EmployeeGrid;
