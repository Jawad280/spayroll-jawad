export type User = {
    id?: string,
    username: string,
    companyName?: string,
    password?: string,
    isAdmin: boolean,
    license?: Date,
    createdAt?: Date,
    adminId?: string,
    admin?: User,
    companies?: User[]
}

// PK -> id
export type Employee = {
    id?: string,
    name?: string,
    NRIC?: string,
    dob?: Date,
    nationality?: "SC" | "Foreigner" | "PR",
    citizenshipStatus?: "SCPR2" | "SCPR1" | "SCPR3" | "Foreigner",
    companyName?: string,
    designation?: string,
    ordinaryWage?: number,
    additionalWage?: number,
    allowance?: number,
    otPay?: number,
    otHours?: number,
    modeOfPayment?: "Cheque" | "Cash" | "BankDeposit",
    typeOfContributionRate?: "FG" | "GG" | "Foreigner",
    joinDate?: Date,
    resignDate?: Date, 
    isResigned?: boolean,
    companyId?: string
}


// PK -> (monthYear, NRIC, companyName)
export type Payslip = {
    id?: string,
    employeeCPF: number,
    employerCPF: number,
    totalCPF: number,
    other?: string,
    otherDeduction?: number,
    monthYear: string,
    dateOfPayment?: Date,
    ordinaryWage?: number,
    allowance?: number,
    additionalWage?: number,
    otPay?: number,
    otHours?: number,
    modeOfPayment?: "Cheque" | "Cash" | "BankDeposit",
    typeOfContributionRate?: "FG" | "GG" | "Foreigner",
    name?: string,
    NRIC?: string,
    dob?: Date,
    nationality?: string,
    citizenshipStatus?: string,
    companyName?: string,
    designation?: string,
    joinDate?: Date,
    employeeId?: string
}