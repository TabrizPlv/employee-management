import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DepartmentEnum } from "../../types/Department/Department.type";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setFormDepartment } from "../../features/employeeForm/employeeFormSlice";

interface DepartmentFieldInterface {
  department: DepartmentEnum;
}

const DepartmentField: React.FC<DepartmentFieldInterface> = (props) => {
  const [department, setDepartment] = useState(props.department);
  const dispatch = useAppDispatch();

  const updateDepartment = (event: SelectChangeEvent) => {
    const dept = event.target.value as DepartmentEnum;
    setDepartment(dept);
    dispatch(setFormDepartment(dept));
  };

  return (
    <Select
      name="department"
      labelId="select-label"
      id="select"
      value={department}
      onChange={updateDepartment}
    >
      <MenuItem disabled={true}>Select an Option</MenuItem>
      <MenuItem value={DepartmentEnum.HR}>HR</MenuItem>
      <MenuItem value={DepartmentEnum.PS}>PS</MenuItem>
    </Select>
  );
};

export default DepartmentField;
