const express = require("express");
const router = express.Router();
const employeeController = require("../employee/employeeController");
const authMiddleware = require("../authentication/authMiddleware");


router.post("/", authMiddleware, employeeController.createEmployee);
router.get("/:id/current",authMiddleware, employeeController.getCurrentSalary);
router.put("/updateemployeesalarydetail",authMiddleware, employeeController.updateEmployeeSalary);
router.delete("/:id", authMiddleware, employeeController.deleteEmployee);
router.get("/findall",authMiddleware, employeeController.getAll);

module.exports = router;