import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Employee } from "../types/Employee/Employee.type";
import { DepartmentEnum } from "../types/Department/Department.type";
import { useCreateEmployeeMutation } from "../features/employee/employeeApi";
import NavBar from "../components/NavBar";

interface FormProps {
  employeeName: string;
  salary: number;
  department: DepartmentEnum;
}

const CreateEmployeePage: React.FC<FormProps> = (props) => {
  const [state, setState] = useState<Partial<Employee>>({
    employeeName: props.employeeName,
    salary: props.salary,
    department: props.department,
  });

  const [createEmployee] = useCreateEmployeeMutation();
  const navigate = useNavigate();
  
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]:
        typeof e.target.value === "string"
          ? parseFloat(e.target.value)
          : e.target.value,
    }));
  };

  const updateDepartment = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const validateName = (name: string | undefined): boolean => {
    if (name) {
      return name.length < 4 || name.length > 30;
    }
    return false;
  };

  const validateSalary = (salary: number | undefined) => {
    if (salary) {
      return salary < 0;
    }
    return false;
  };

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (
      validateName(state.employeeName) ||
      validateSalary(state.salary) ||
      state.department === DepartmentEnum.NONE
    ) {
      alert("Input Error!");
    } else {
      try {
        await createEmployee(state);
        navigate("/home");
      } catch (e) {
        alert("An error has occured! Try again.");
      }
    }
  }

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
      >
        <h2>Add Employee</h2>
      </div>
      <form>
        <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
          <TextField
            error={validateName(state.employeeName)}
            helperText={
              validateName(state.employeeName)
                ? "Length must be between 4 and 30 characters!"
                : ""
            }
            name="employeeName"
            type="text"
            variant="outlined"
            color="secondary"
            label="Name"
            onChange={updateState}
            value={state.employeeName}
            fullWidth
            required
          />
          <TextField
            type="number"
            error={validateSalary(state.salary)}
            helperText={
              validateSalary(state.salary) ? "Salary must be positive" : ""
            }
            name="salary"
            variant="outlined"
            color="secondary"
            label="Salary"
            onChange={updateSalary}
            value={state.salary}
            fullWidth
            required
          />
          <Select
            name="department"
            labelId="select-label"
            id="select"
            value={state.department}
            onChange={updateDepartment}
            label="Department"
          >
            <MenuItem disabled={true}>Select an Option</MenuItem>
            <MenuItem value={DepartmentEnum.HR}>HR</MenuItem>
            <MenuItem value={DepartmentEnum.PS}>PS</MenuItem>
          </Select>
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            size="large"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateEmployeePage;
