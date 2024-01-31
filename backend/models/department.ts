import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Sequelize,
} from "sequelize";
import sequelizeConnection from "../config/sequelize-config";

class department extends Model<
  InferAttributes<department>,
  InferCreationAttributes<department>
> {
  declare department: string;

  static associate(models: any): void {
    department.hasMany(models.Employee, { foreignKey: "department_id" });
  }
}
department.init(
  {
    department: DataTypes.STRING,
  },
  {
    sequelize: sequelizeConnection,
    tableName: "departments",
  }
);

export default (sequelize: Sequelize, DataTypes: any) => department;
