import express from "express";
import { userController } from "../controllers/userController.mjs";
const router = express.Router();

router.get("/", userController.getAllUsers)
router
  .get("/:id", userController.getUser)
  .put("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

export default router;
