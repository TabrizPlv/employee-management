import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelizeConnection from "../config/sequelize-config";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare department_id: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
  }
);

export default (sequelize: Sequelize, DataTypes: any) => User;
