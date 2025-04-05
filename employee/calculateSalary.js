const calculateSalary = (salaryData) => {
    const grossEarnings =
        (salaryData.basic || 0) +
        (salaryData.hra || 0) +
        (salaryData.conveyance || 0) +
        (salaryData.uniformAllowance || 0) +
        (salaryData.washingAllowance || 0) +
        (salaryData.efficiencyBonus || 0);

    const grossDeductions =
        (salaryData.tds || 0) +
        (salaryData.pf || 0) +
        (salaryData.esi || 0) +
        (salaryData.professionalTax || 0) +
        (salaryData.lop || 0) +
        (salaryData.voluntaryPF || 0);

    const netSalary = grossEarnings - grossDeductions;

    return {
        earnings: { ...salaryData, grossEarnings },
        deductions: {
            tds: salaryData.tds || 0,
            pf: salaryData.pf || 0,
            esi: salaryData.esi || 0,
            professionalTax: salaryData.professionalTax || 0,
            lop: salaryData.lop || 0,
            voluntaryPF: salaryData.voluntaryPF || 0,
            grossDeductions
        },
        netSalary,
        date: new Date()
    };
};

module.exports = calculateSalary;