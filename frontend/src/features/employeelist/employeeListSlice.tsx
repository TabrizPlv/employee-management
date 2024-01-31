import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../../types/Employee/Employee.type";
import { EmployeeArray } from "../../types/Employee/ResponseInterface/EmployeeArray.interface";

const initialemployeeArray: Employee[] = [];
const initialState: EmployeeArray = { employeeArray: initialemployeeArray };

export const employeeArraySlice = createSlice({
  name: "employeeArray",
  initialState: initialState,
  reducers: {
    setEmployeeArray: (state, action: PayloadAction<EmployeeArray>) => {
      state = action.payload;
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const updatedEmployee = action.payload;
      state.employeeArray[updatedEmployee.id] = updatedEmployee;
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      const updatedemployeeArray: Employee[] = state.employeeArray.filter(
        (employee) => employee.id !== action.payload
      );
      state.employeeArray = updatedemployeeArray;
    },
  },
});

export const { setEmployeeArray, updateEmployee, deleteEmployee } =
  employeeArraySlice.actions;

export default employeeArraySlice.reducer;
