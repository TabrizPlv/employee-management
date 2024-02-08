import { combineReducers } from "redux";
import { employeeApi } from "../features/employee/employeeApi";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import employeeListReducer from "../features/employeelist/employeeListSlice";
import employeeFormReducer from "../features/employeeForm/employeeFormSlice";
import employeePaginationReducer from "../features/employeePagination/employeePaginationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  employeeList: employeeListReducer,
  employeeForm: employeeFormReducer,
  employeePagination: employeePaginationReducer,
});

export default rootReducer;