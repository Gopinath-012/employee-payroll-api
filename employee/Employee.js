const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
    earnings: {
        basic: Number,
        hra: Number,
        conveyance: Number,
        uniformAllowance: Number,
        washingAllowance: Number,
        efficiencyBonus: Number,
        grossEarnings: Number
    },
    deductions: {
        tds: Number,
        pf: Number,
        esi: Number,
        professionalTax: Number,
        lop: Number,
        voluntaryPF: Number,
        grossDeductions: Number
    },
    netSalary: Number,
    date: { type: Date, default: Date.now }
});

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // salaryHistory: [SalarySchema],
    currentSalary: SalarySchema
});

module.exports = mongoose.model("Employee", EmployeeSchema);