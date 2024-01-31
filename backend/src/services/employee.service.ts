import { Employee, Department, Departments } from "../../models/employee";
import EmployeePagination from "../../models/employeePagination";
import GetAllResponse from "../../models/getAllResponse";

export class EmployeeService {
  static async getAllEmployee(
    page: number,
    userType: number
  ): Promise<Partial<GetAllResponse>> {
    const dept = Department.getDepartmentById(userType);
    let responseData;
    if (dept === Departments.ADMIN) {
      responseData = await Employee.findAll({
        order: [["id", "ASC"]],
      });
    } else {
      responseData = await Employee.findAll({
        where: { department: dept },
        order: [["id", "ASC"]],
      });
    }
    const total = responseData.length;
    const currentPage = responseData.slice((page - 1) * 10, page * 10);
    const maxPage = Math.ceil(total / 10);
    const hasNextPage = page !== maxPage;
    const hasPreviousPage = page > 1;
    const paginationResponse: EmployeePagination = {
      page,
      total,
      currentPage,
      hasNextPage,
      hasPreviousPage,
    };
    return {
      allEmployees: responseData,
      employeePagination: paginationResponse,
    };
  }

  static async addEmployee(
    employeeName: string,
    salary: number,
    department: Department
  ): Promise<Employee> {
    const newEmployee = await Employee.create({
      employeeName,
      salary,
      department,
    });
    return newEmployee;
  }

  static async getOneEmployee(emp_id: number): Promise<Employee | null> {
    const employee = await Employee.findOne({ where: { id: emp_id } });
    return employee;
  }

  static async updateEmployee(
    emp_id: number,
    updatedFields: Partial<Employee>
  ): Promise<Employee[]> {
    const affectedEmployees: Employee[] = (
      await Employee.update(updatedFields, {
        where: { id: emp_id },
        returning: true,
      })
    )[1];
    return affectedEmployees;
  }

  static async deleteEmployee(emp_id: number): Promise<number> {
    const numDeleted = await Employee.destroy({ where: { id: emp_id } });
    return numDeleted;
  }
}
