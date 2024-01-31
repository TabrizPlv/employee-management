import { Employee } from "./employee";
import EmployeePagination from "./employeePagination";

export default interface GetAllResponse {
    allEmployees: Employee[];
    employeePagination: EmployeePagination;
}