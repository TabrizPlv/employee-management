import { Employee } from "./Employee.type";

export default interface EmployeePagination {
    page: number;
    currentPage: Employee[];
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}