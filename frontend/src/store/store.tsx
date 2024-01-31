import { configureStore } from "@reduxjs/toolkit";
import { employeeApi } from "../features/employee/employeeApi";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import employeeListReducer from "../features/employeelist/employeeListSlice";
import employeeFormReducer from "../features/employeeForm/employeeFormSlice";
import employeePaginationReducer from "../features/employeePagination/employeePaginationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    employeeList: employeeListReducer,
    employeeForm: employeeFormReducer,
    employeePagination: employeePaginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeeApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
