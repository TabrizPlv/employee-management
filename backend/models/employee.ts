import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import sequelizeConnection from "../config/sequelize-config";
import { InvalidInputError } from "../src/errors/InvalidInputError";

export enum Departments {
  ADMIN = "ADMIN",
  HR = "HR",
  PS = "PS",
}

export class Department {
  department: string;

  constructor(department: string) {
    this.department = department.toLowerCase();
  }

  public isValidDepartment(): boolean {
    return Object.values<string>(Departments).includes(this.department);
  }

  public getDepartment(): string {
    return this.department;
  }

  public static getDepartmentById(id: number) {
    switch (id) {
      case 2:
        return Departments.ADMIN;
      case 3:
        return Departments.HR;
      case 4:
        return Departments.PS;
      default:
        return "";
    }
  }
}

export class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  declare id: CreationOptional<number>;
  declare employeeName: string;
  declare salary: number;
  declare department: Department;

  toJson() {
    return { ...this.get(), id: undefined };
  }

  static validateInputs(name: string, salary: number, department: string) {
    const checkDepartment = (dept: string | undefined) =>
      dept !== undefined ? new Department(dept) : undefined;
    const dept = checkDepartment(department);
    if (
      (typeof name !== "string" && name !== undefined) ||
      (typeof salary !== "number" && salary !== undefined) ||
      (dept !== undefined && !dept.isValidDepartment())
    ) {
      throw new InvalidInputError();
    }
  }

  static getStartId(range: number): number {
    const start: number = (range - 1) * 10;
    return start;
  }
}
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    employeeName: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.INTEGER, allowNull: false },
    department: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "employees",
  }
);

export default (sequelize: Sequelize, DataTypes: any) => Employee;
