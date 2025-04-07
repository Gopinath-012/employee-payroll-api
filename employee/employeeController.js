const Employee = require("../employee/Employee");
const calculateSalary = require("../employee/calculateSalary");
const sendResponse = require("../utils/responseHandler");
const httpStatus = require("../utils/httpStatus")

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, earnings, deductions } = req.body;

        if (!name || !email || !earnings || !deductions) {
            sendResponse(res, httpStatus.ClientError.UNAUTHORIZED, "All fields are required created successfully", { errors: "All fields are required created successfully" })
            }

        const salaryRecord = calculateSalary({ ...earnings, ...deductions });

        const newEmployee = new Employee({
            name,
            email,
            currentSalary: salaryRecord
        });

        await newEmployee.save();
        sendResponse(res, httpStatus.Success.CREATED, "Employee created successfully", { employee: newEmployee })

    } catch (error) {
        sendResponse(res, httpStatus.ServerError.INTERNAL_SERVER_ERROR, "Failed to Create Employee", { employee: null })

    }
};



exports.getCurrentSalary = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        sendResponse(res, httpStatus.Success.OK, "Get Current SalryInfo For Employee", { name: employee.name, email: employee.email, currentSalary: employee.currentSalary })

    } catch (error) {
        sendResponse(res, httpStatus.ServerError.INTERNAL_SERVER_ERROR, "Error", {}, { error: error.message })

    }
};

exports.updateEmployeeSalary = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging line
        //const { id } = req.params; // Employee ID from URL
        const { id, earnings, deductions } = req.body;

        if (!earnings || !deductions) {
            sendResponse(res, httpStatus.ClientError.BAD_REQUEST, "Earnings and deductions are required", { error: "Earnings and deductions are required" })
          
        }

        // Find employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            sendResponse(res, httpStatus.ClientError.NOT_FOUND, "Employee not found", { error: "Employee not found" })
        }


        // Calculate updated salary
        const updatedSalaryRecord = calculateSalary({ ...earnings, ...deductions });

        // Update salary history & current salary
        employee.currentSalary = updatedSalaryRecord;

        // Save updated employee record
        await employee.save();
        sendResponse(res, httpStatus.Success.OK, "Employee salary updated successfully", { name: employee.name, email: employee.email, currentSalary: employee.currentSalary })

    } catch (error) {
        sendResponse(res, httpStatus.ServerError.INTERNAL_SERVER_ERROR, "Error", { error: error.message })
       
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        sendResponse(res, httpStatus.Success.OK, "Employee Deleted Successfully", { employeeId: employee._id })
        //res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        sendResponse(res, httpStatus.ServerError.INTERNAL_SERVER_ERROR, "Error", { error: error.message })
       
    }
};

exports.getAll = async (req, res) => {
    try {
        console.log("Reached getAll");
        const employee = await Employee.find();
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        sendResponse(res, httpStatus.Success.OK, "Employee Info", { employee });
        //res.status(200).json(employee);
    } catch (error) {
        sendResponse(res, httpStatus.ServerError.INTERNAL_SERVER_ERROR, "Error", { error: error.message })
    }
};