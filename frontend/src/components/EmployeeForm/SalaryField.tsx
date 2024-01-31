import { TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setFormSalary } from "../../features/employeeForm/employeeFormSlice";

interface SalaryFieldProps {
  salary: number;
}

export const validateSalary = (salary: number | undefined) => {
  if (salary) {
    return salary < 0;
  }
  return false;
};

const SalaryField: React.FC<SalaryFieldProps> = (props) => {
  const [salary, setSalary] = useState(props.salary);
  const dispatch = useAppDispatch();

  const updateSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parseSalary = () => {
      if (e.target.value === "") {
        return 0;
      } else {
        return parseInt(e.target.value);
      }
    };
    const newSalary = parseSalary();
    setSalary(newSalary);
    dispatch(setFormSalary(newSalary));
  };

  return (
    <TextField
      error={validateSalary(salary)}
      helperText={validateSalary(salary) ? "Salary must be positive" : ""}
      name="salary"
      type="text"
      variant="outlined"
      color="secondary"
      label="Salary"
      onChange={updateSalary}
      value={salary}
      fullWidth
      required
    />
  );
};

export default SalaryField;
