import express from "express";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";

const { sequelize } = require("../models");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

routes(app);

const port = 3001;

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});

app.listen(5005, async () => {
  await sequelize.authenticate();
});
