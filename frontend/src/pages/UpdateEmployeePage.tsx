import React from "react";
import { useParams } from "react-router-dom";
import { Employee } from "../types/Employee/Employee.type";
import { DepartmentEnum } from "../types/Department/Department.type";
import NavBar from "../components/NavBar";
import { useGetOneEmployeeQuery } from "../features/employee/employeeApi";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import { useAppDispatch } from "../hooks/hooks";
import { useEffect } from "react";
import { setEmployeeForm } from "../features/employeeForm/employeeFormSlice";

const UpdateEmployeePage: React.FC = () => {
  const { emp_id } = useParams();
  const id = emp_id ? parseInt(emp_id, 10) : 0;
  const { data, isLoading } = useGetOneEmployeeQuery(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setEmployeeForm(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  const emp: Employee = data
    ? data
    : {
        id: 0,
        employeeName: "undefined",
        salary: 0,
        department: DepartmentEnum.NONE,
      };
  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      ></div>
      <EmployeeForm employee={emp} />
    </>
  );
};

export default UpdateEmployeePage;
