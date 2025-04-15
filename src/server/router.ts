import express from "express";
import { ImageController } from "./image";

export const router = express.Router();

const imageRouter = express.Router();

imageRouter.route("/").get(ImageController.getAll).post(ImageController.create);

imageRouter
  .route("/:id")
  .get(ImageController.getById)
  .put(ImageController.update)
  .delete(ImageController.delete);

router.use("/images", imageRouter);
