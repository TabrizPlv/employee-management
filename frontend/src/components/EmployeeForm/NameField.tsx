import { TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setFormName } from "../../features/employeeForm/employeeFormSlice";

interface NameFieldProps {
  employeeName: string;
}

export const validateName = (name: string | undefined): boolean => {
  if (name) {
    return name.length < 4 || name.length > 30;
  }
  return false;
};

const NameField: React.FC<NameFieldProps> = (props) => {
  const [employeeName, setEmployeeName] = useState(props.employeeName);
  const dispatch = useAppDispatch();

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(e.target.value);
    dispatch(setFormName(e.target.value));
  };

  return (
    <TextField
      error={validateName(employeeName)}
      helperText={
        validateName(employeeName)
          ? "Length must be between 4 and 30 characters!"
          : ""
      }
      name="employeeName"
      type="text"
      variant="outlined"
      color="secondary"
      label="Name"
      onChange={updateState}
      value={employeeName}
      fullWidth
      required
    />
  );
};

export default NameField;
