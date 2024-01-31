import { DepartmentEnum } from "../Department/Department.type"

export type Employee = {
    id: number,
    employeeName: string,
    department: DepartmentEnum,
    salary: number
}