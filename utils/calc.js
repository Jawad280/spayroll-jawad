const { SCPR_3_PERCENTAGES_EMPLOYEE,
    SCPR_3_PERCENTAGES_TOTAL } = require('@/utils/cpfModels/SCPR3')

const { SCPR_1_FG_PERCENTAGES_TOTAL,
    SCPR_1_FG_PERCENTAGES_EMPLOYEE } = require('@/utils/cpfModels/SCPR1/SCPR1FG')
const { SCPR_1_GG_PERCENTAGES_TOTAL, SCPR_1_GG_PERCENTAGES_EMPLOYEE } = require('@/utils/cpfModels/SCPR1/SCPR1GG')

const { SCPR_2_FG_PERCENTAGES_TOTAL, SCPR_2_FG_PERCENTAGES_EMPLOYEE } = require('@/utils/cpfModels/SCPR2/SCPR2FG')
const { SCPR_2_GG_PERCENTAGES_TOTAL, SCPR_2_GG_PERCENTAGES_EMPLOYEE } = require('@/utils/cpfModels/SCPR2/SCPR2GG')


function getCpfPercentages(age, totalWage, percentageData) {
    let ageGroup;
    let salaryBracket;

    if (age <= 55) {
        ageGroup = '55_AND_BELOW';
    } else if (age < 60) {
        ageGroup = 'ABOVE_55_TO_60';
    } else if (age < 65) {
        ageGroup = 'ABOVE_60_TO_65';
    } else if (age < 70) {
        ageGroup = 'ABOVE_65_TO_70';
    } else {
        ageGroup = 'ABOVE_70';
    }

    if (totalWage < 50) {
        salaryBracket = '<$50';
    } else if (totalWage <= 500) {
        salaryBracket = '>$50_TO_$500';
    } else if (totalWage <= 750) {
        salaryBracket = '>$500_TO_$750';
    } else {
        salaryBracket = '>$750';
    }

    return percentageData.AGE[ageGroup][salaryBracket];
}

function calculateCpf(ordinaryWage, additionalWage, result) {
    let totalWage = additionalWage + ordinaryWage;
    
    let twRate = result.TW;
    let tw500Rate = result.TW_500;
    let owRate = result.OW;
    let awRate = result.AW;
    let maxOw = result.MAX;

    let owPart = 0;
    if (owRate != 0) {
        owPart = Math.min(maxOw, (ordinaryWage * owRate));
    } 

    let totalContribution = (twRate*totalWage) + (tw500Rate*(totalWage-500)) + owPart + (awRate*additionalWage);
    console.log("total contribution : ", totalContribution, "percentages: ", result, "total wage: ", totalWage);
    return totalContribution;
}

function getCpfContributionTotal(age, ordinaryWage, additionalWage, citizenshipStatus) {
    console.log("ordinaryWage : ", ordinaryWage);
    let totalWage = ordinaryWage + additionalWage;

    // SCPR3, SCPR1FG, SCPR1GG, SCPR2FG, SCPR2GG
    console.log("citizenship : ", citizenshipStatus);
    
    let employeeCPF = 0;
    let totalCPF = 0;
    let percentageInfoTotal;
    let percentageInfoEmployee;

    if (citizenshipStatus === "Foreigner") {
        return {
            employeeCPF,
            totalCPF
        }
    } else if (citizenshipStatus === "SCPR3") {
        percentageInfoTotal = SCPR_3_PERCENTAGES_TOTAL;
        percentageInfoEmployee = SCPR_3_PERCENTAGES_EMPLOYEE;
    } else if (citizenshipStatus === "SCPR1_FG") {
        percentageInfoTotal = SCPR_1_FG_PERCENTAGES_TOTAL;
        percentageInfoEmployee = SCPR_1_FG_PERCENTAGES_EMPLOYEE;
    } else if (citizenshipStatus === "SCPR1_GG") {
        percentageInfoTotal = SCPR_1_GG_PERCENTAGES_TOTAL;
        percentageInfoEmployee = SCPR_1_GG_PERCENTAGES_EMPLOYEE;
    } else if (citizenshipStatus === "SCPR2_FG") {
        percentageInfoTotal = SCPR_2_FG_PERCENTAGES_TOTAL;
        percentageInfoEmployee = SCPR_2_FG_PERCENTAGES_EMPLOYEE;
    } else if (citizenshipStatus === "SCPR2_GG") {
        percentageInfoTotal = SCPR_2_GG_PERCENTAGES_TOTAL;
        percentageInfoEmployee = SCPR_2_GG_PERCENTAGES_EMPLOYEE;
    }

    let totalPercentages = getCpfPercentages(age, totalWage, percentageInfoTotal);
    totalCPF = calculateCpf(ordinaryWage, additionalWage, totalPercentages);

    let employeePercentages = getCpfPercentages(age, totalWage, percentageInfoEmployee);
    employeeCPF = calculateCpf(ordinaryWage, additionalWage, employeePercentages);

    totalCPF = Math.round(totalCPF);
    employeeCPF = Math.round(employeeCPF);

    return {
        employeeCPF,
        totalCPF
    };
}


module.exports = { 
    getCpfContributionTotal,
}
