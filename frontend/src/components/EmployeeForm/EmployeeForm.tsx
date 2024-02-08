import { Button, Stack } from "@mui/material";
import { DepartmentEnum } from "../../types/Department/Department.type";
import { useUpdateEmployeeMutation } from "../../features/employee/employeeApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NameField, { validateName } from "./NameField";
import SalaryField, { validateSalary } from "./SalaryField";
import DepartmentField from "./DepartmentField";
import { useAppSelector } from "../../hooks/hooks";
import { Employee } from "../../types/Employee/Employee.type";

interface EmployeeFormProp {
  employee: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProp> = (props) => {
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    employeeName: props.employee.employeeName,
    salary: props.employee.salary,
    department: props.employee.department,
  });

  const empInForm = useAppSelector((state) => state.employeeForm);

  const noChangesMade = () => {
    return (
      empInForm.employeeName === state.employeeName &&
      empInForm.salary === state.salary &&
      empInForm.department === state.department
    );
  };

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (
      validateName(empInForm.employeeName) ||
      validateSalary(empInForm.salary) ||
      state.department === DepartmentEnum.NONE
    ) {
      alert("Input Error!");
    } else if (noChangesMade()) {
      alert("No Changes made!");
    } else {
      try {
        await updateEmployee(empInForm);
        navigate("/home");
      } catch (e) {
        alert("An error has occured! Try again.");
      }
    }
  }

  return (
    <form>
      <Stack spacing={2} direction="column" sx={{ margin: 4 }}>
        <NameField employeeName={state.employeeName} />
        <SalaryField salary={state.salary} />
        <DepartmentField department={state.department} />
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
          Update
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
