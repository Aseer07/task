import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controller/emp.js";
import uploadEmpImg from "../middleware/fileUpload.js";
import verifyToken from "../middleware/checkLogin.js";

const router = express.Router();
router.post(
  "/employees",
  verifyToken,
  uploadEmpImg.single("imgupload"),
  createEmployee
);
router.get("/employees", verifyToken, getAllEmployees);
router.get("/employees/:id", verifyToken, getEmployeeById);
router.put(
  "/employees/:id",
  verifyToken,
  uploadEmpImg.single("imgupload"),
  updateEmployee
);
router.delete(
  "/employees/:id",
  verifyToken,
  uploadEmpImg.single("imgupload"),
  deleteEmployee
);

export default router;
