const express = require("express");
const router = express.Router();
const employeeController = require("../employee/employeeController");
const authMiddleware = require("../authentication/authMiddleware");
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), employeeController.createEmployee);
router.get("/:id/current", passport.authenticate("jwt", { session: false }), employeeController.getCurrentSalary);
router.put("/updateemployeesalarydetail", passport.authenticate("jwt", { session: false }), employeeController.updateEmployeeSalary);
router.delete("/:id", passport.authenticate("jwt", { session: false }), employeeController.deleteEmployee);
 router.get("/findall", passport.authenticate("jwt", { session: false }), employeeController.getAll);
//router.get("/findall", authMiddleware, employeeController.getAll);
module.exports = router;