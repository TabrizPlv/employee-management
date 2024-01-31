import { Express } from "express";
import {
  getEmployeeByPage,
  addEmployee,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
} from "./controllers/employee.controller";
import { authenticateJWT } from "./middleware/authenticateJWT";
import { loginUser, registerUser } from "./controllers/user.controller";

function routes(app: Express) {
  app
    .route("/employee")
    .get(getEmployeeByPage)
    .post(authenticateJWT, addEmployee);
  app
    .route("/employee/:emp_id")
    .get(getOneEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);
  app.route("/user").post(registerUser);
  app.post("/user/login", loginUser);
}

export default routes;
