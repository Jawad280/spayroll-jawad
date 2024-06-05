import { getCpfContributionTotal } from "@/utils/calc";
import { Employee } from "@/types";

export function generatePayslips(employee: Employee) {
  const calculateAge = (dob: Date | undefined): number | undefined => {
    if (!dob) {
      return undefined; // or handle the undefined case as needed
    }
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age: number | undefined = calculateAge(new Date(employee.dob || ""));

  if (employee.nationality == "Foreigner") {
    return getCpfContributionTotal(
      age,
      employee.ordinaryWage,
      employee.additionalWage,
      "Foreigner"
    );
  } else {
    if (employee.citizenshipStatus == "SCPR3") {
      return getCpfContributionTotal(
        age,
        employee.ordinaryWage,
        employee.additionalWage,
        "SCPR3"
      );
    }

    if (employee.citizenshipStatus == "SCPR1") {
      if (employee.typeOfContributionRate == "FG") {
        return getCpfContributionTotal(
          age,
          employee.ordinaryWage,
          employee.additionalWage,
          "SCPR1_FG"
        );
      } else {
        return getCpfContributionTotal(
          age,
          employee.ordinaryWage,
          employee.additionalWage,
          "SCPR1_GG"
        );
      }
    }

    if (employee.citizenshipStatus == "SCPR2") {
      if (employee.typeOfContributionRate == "FG") {
        return getCpfContributionTotal(
          age,
          employee.ordinaryWage,
          employee.additionalWage,
          "SCPR2_FG"
        );
      } else {
        return getCpfContributionTotal(
          age,
          employee.ordinaryWage,
          employee.additionalWage,
          "SCPR2_GG"
        );
      }
    }
  }
}
