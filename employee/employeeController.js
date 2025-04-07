const Employee = require("../employee/Employee");
const calculateSalary = require("../employee/calculateSalary");

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, earnings, deductions } = req.body;

        if (!name || !email || !earnings || !deductions) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const salaryRecord = calculateSalary({ ...earnings, ...deductions });

        const newEmployee = new Employee({
            name,
            email,
            //salaryHistory: [salaryRecord],
            currentSalary: salaryRecord
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getCurrentSalary = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.json({ name:employee.name,email:employee.email,currentSalary: employee.currentSalary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmployeeSalary = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging line
        //const { id } = req.params; // Employee ID from URL
        const { id, earnings, deductions } = req.body;

        if (!earnings || !deductions) {
            return res.status(400).json({ error: "Earnings and deductions are required" });
        }

        // Find employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        
        // if (name) employee.name = name;
        // if (email) employee.email = email;
        // Calculate updated salary
        const updatedSalaryRecord = calculateSalary({ ...earnings, ...deductions });

        // Update salary history & current salary
        //employee.salaryHistory.push(updatedSalaryRecord);
        employee.currentSalary = updatedSalaryRecord;

        // Save updated employee record
        await employee.save();

        res.status(200).json({ message: "Employee salary updated successfully", employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        console.log("Reached getAll");
        const employee = await Employee.find();
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};