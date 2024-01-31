import { Employee } from "./employee";

export default interface EmployeePagination {
    page: number;
    currentPage: Employee[];
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}