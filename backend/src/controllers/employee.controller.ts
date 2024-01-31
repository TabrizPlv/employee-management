import { Request, Response } from "express";
import ErrorUtil from "../ErrorUtil";
import { EmployeeService } from "../services/employee.service";
import { Employee } from "../../models/employee";

export async function getEmployeeByPage(req: Request, res: Response) {
  try {
    const { pageNumber, type } = req.query;
    if (typeof type == "string" && typeof pageNumber === "string") {
      const userType = parseInt(type);
      const page = parseInt(pageNumber);
      const responseData = await EmployeeService.getAllEmployee(page, userType);
      res.status(200).json(responseData);
    }
  } catch (e) {
    const err = ErrorUtil.checkError(e);
    res.status(500).json({ errorMessage: err.message });
  }
}

export async function addEmployee(req: Request, res: Response) {
  try {
    const { employeeName, salary, department } = req.body;
    Employee.validateInputs(employeeName, salary, department);
    const newEmployee: Employee = await EmployeeService.addEmployee(
      employeeName,
      salary,
      department
    );
    res.status(200).json({ newEmployee: newEmployee });
  } catch (e) {
    const err = ErrorUtil.checkError(e);
    res.status(500).json({ errorMessage: err.message });
  }
}

export async function getOneEmployee(req: Request, res: Response) {
  try {
    const emp_id: number = parseInt(req.params.emp_id);
    const employee: Employee | null = await EmployeeService.getOneEmployee(
      emp_id
    );
    res.status(200).json(employee);
  } catch (e) {
    const err = ErrorUtil.checkError(e);
    res.status(500).json({ errorMessage: err.message });
  }
}

export async function updateEmployee(req: Request, res: Response) {
  try {
    const emp_id: number = parseInt(req.params.emp_id);
    const updatedFields: Partial<Employee> = req.body;
    const { name, salary, department } = req.body;
    Employee.validateInputs(name, salary, department);
    const updatedEmployee: Employee[] = await EmployeeService.updateEmployee(
      emp_id,
      updatedFields
    );
    res.status(200).json({ "Updated number of employees": updatedEmployee });
  } catch (e) {
    const err = ErrorUtil.checkError(e);
    res.status(500).json({ errorMessage: err.message });
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  try {
    const emp_id: number = parseInt(req.params.emp_id);
    EmployeeService.deleteEmployee(emp_id);
    res.sendStatus(204);
  } catch (e) {
    const err = ErrorUtil.checkError(e);
    res.status(500).json({ errorMessage: err.message });
  }
}
