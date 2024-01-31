import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../types/Employee/Employee.type";
import { DepartmentEnum } from "../../types/Department/Department.type";

export interface EmployeeState {
  employee: Employee;
}

const initialEmployee: Employee = {
  id: 0,
  employeeName: "default",
  salary: 0,
  department: DepartmentEnum.HR,
};
const initialState: EmployeeState = { employee: initialEmployee };

export const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    getSomeEmployees: (state, action: PayloadAction<number>) => {
      state.employee.id = 0;
    },
    updateEmployee: (state, action: PayloadAction<number>) => {},
  },
});

export const { getSomeEmployees, updateEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
