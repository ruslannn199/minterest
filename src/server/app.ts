import express from "express";
import { router } from "./router";
import { pool } from "./db";
import { seedData } from "./seed";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import { extname, join } from "path";
import fs from "fs/promises";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(router);

const port = 8000;

const start = async () => {
  await pool.query("SELECT 1");

  const uploadFolder = join(__dirname, "..", "..", "public", "uploads");

  await fs.mkdir(uploadFolder, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      return cb(
        null,
        file.fieldname + "-" + Date.now() + extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage });

  app.post("/upload", upload.single("image"), (req, res) => {
    res.status(201).json({
      status: "success",
      message: "File upload successfully!!",
      filename: req.file?.filename,
    });
  });

  app.delete("/upload/:name", async (req, res) => {
    const { name } = req.params;
    const uploadFile = join(uploadFolder, name);
    try {
      await fs.unlink(uploadFile);
    } catch (err) {
      console.error(err);
    }
    res.status(200).json({
      status: "success",
      message: "File deleted successfully",
    });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  await seedData();
};

start();
