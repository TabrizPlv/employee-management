import { Employee } from "../Employee.type";
import EmployeePagination from "../EmployeePagination.type";

export default interface GetAllResponse {
  allEmployees: Employee[];
  employeePagination: EmployeePagination;
}
