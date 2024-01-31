import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../types/Employee/Employee.type";
import { DepartmentEnum } from "../../types/Department/Department.type";

const initialemployee: Employee = {
  id: 0,
  employeeName: "default",
  salary: 0,
  department: DepartmentEnum.NONE,
};

export const employeeFormSlice = createSlice({
  name: "employeeForm",
  initialState: initialemployee,
  reducers: {
    setEmployeeForm: (state, action: PayloadAction<Employee>) => {
      return { ...state, ...action.payload };
    },
    setFormName: (state, action: PayloadAction<string>) => {
      state.employeeName = action.payload;
    },
    setFormSalary: (state, action: PayloadAction<number>) => {
      state.salary = action.payload;
    },
    setFormDepartment: (state, action: PayloadAction<DepartmentEnum>) => {
      state.department = action.payload;
    },
  },
});

export const {
  setEmployeeForm,
  setFormName,
  setFormSalary,
  setFormDepartment,
} = employeeFormSlice.actions;

export default employeeFormSlice.reducer;
