import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "../../types/Employee/Employee.type";
import GetAllResponse from "../../types/Employee/ResponseInterface/GetAllResponse.interface";
import { RootState } from "../../store/store";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
      const jwtToken = (getState() as RootState).auth.token;
      if (jwtToken) {
        headers.set("Authorization", `Bearer ${jwtToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["List"],
  endpoints: (builder) => ({
    getEmployeesByPage: builder.query<GetAllResponse, { pageNumber: number, type: number }>({
      query: (queryParams) => ({ url: "/employee", params: queryParams }),
      providesTags: ["List"],
    }),
    getOneEmployee: builder.query<Employee, number>({
      query: (emp_id) => ({ url: `/employee/${emp_id}` }),
      providesTags: ["List"],
    }),
    createEmployee: builder.mutation<void, Partial<Employee>>({
      query: (employee) => ({
        url: "/employee",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: ["List"],
    }),
    updateEmployee: builder.mutation<void, Employee>({
      query: (employee) => ({
        url: `employee/${employee.id}`,
        method: "PATCH",
        body: employee,
      }),
      invalidatesTags: ["List"],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (emp_id) => ({ url: `/employee/${emp_id}`, method: "DELETE" }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const {
  useGetEmployeesByPageQuery,
  useGetOneEmployeeQuery,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi; //RTK Query automatically creates hooks for us based on our queries
