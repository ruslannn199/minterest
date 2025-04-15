import express from "express";
import { router } from "./router";
import { pool } from "./db";
import { seedData } from "./seed";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(router);

const port = 8000;

const start = async () => {
  await pool.query("SELECT 1");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  await seedData();
};

start();
