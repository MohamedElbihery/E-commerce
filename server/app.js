import express from "express";
import cors from "cors";
import { DBconnect } from "./database/dbConnection.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { handleUrlError } from "./src/middlewares/errors/urlError.js";
import { handleGlopalError } from "./src/middlewares/errors/globalError.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

bootstrap(app);

app.use("*", handleUrlError);

app.use(handleGlopalError);

DBconnect;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
