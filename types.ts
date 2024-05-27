export type User = {
    id?: string,
    username: string,
    companyName?: string,
    password?: string,
    isAdmin: boolean,
    license?: Date,
    createdAt?: Date
}

// PK -> id
export type Employee = {
    id?: string,
    name?: string,
    NRIC?: string,
    dob?: Date,
    nationality?: "SC" | "Foreigner" | "PR",
    citizenshipStatus?: "SCPR2" | "SCPR1" | "SCPR3",
    companyName?: string,
    designation?: string,
    ordinaryWage?: number,
    additionalWage?: number,
    allowance?: number,
    otPay?: number,
    otHours?: number,
    modeOfPayment?: "Cheque" | "Cash" | "BankDeposit",
    typeOfContributionRate?: "FG" | "GG",
    joinDate?: Date,
    resignDate?: Date, 
    isResigned?: boolean,
}


// PK -> (monthYear, NRIC, companyName)
export type Payslip = {
    id?: string,
    employeeCPF: number,
    employerCPF: number,
    totalCPF: number,
    other?: string,
    otherDeduction?: number,
    monthYear: Date,
    dateOfPayment?: Date,
    ordinaryWage?: number,
    allowance?: number,
    additionalWage?: number,
    otPay?: number,
    otHours?: number,
    modeOfPayment?: "Cheque" | "Cash" | "BankDeposit",
    typeOfContributionRate?: "FG" | "GG",
    name?: string,
    NRIC?: string,
    dob?: Date,
    nationality?: string,
    citizenshipStatus?: string,
    companyName?: string,
    designation?: string,
    joinDate?: Date,
}