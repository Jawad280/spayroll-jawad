-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('SC', 'Foreigner', 'PR');

-- CreateEnum
CREATE TYPE "CitizenshipStatus" AS ENUM ('SCPR2', 'SCPR1', 'SCPR3');

-- CreateEnum
CREATE TYPE "ModeOfPayment" AS ENUM ('Cheque', 'Cash', 'BankDeposit');

-- CreateEnum
CREATE TYPE "ContributionRate" AS ENUM ('FG', 'GG');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "license" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "NRIC" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "nationality" "Nationality" NOT NULL,
    "citizenshipStatus" "CitizenshipStatus" NOT NULL,
    "companyName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "ordinaryWage" INTEGER NOT NULL,
    "additionalWage" INTEGER NOT NULL,
    "allowance" INTEGER NOT NULL,
    "otPay" INTEGER NOT NULL,
    "otHours" INTEGER NOT NULL,
    "modeOfPayment" "ModeOfPayment" NOT NULL,
    "typeOfContributionRate" "ContributionRate" NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "isResigned" BOOLEAN NOT NULL,
    "resignDate" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payslip" (
    "id" TEXT NOT NULL,
    "employeeCPF" INTEGER NOT NULL,
    "employerCPF" INTEGER NOT NULL,
    "totalCPF" INTEGER NOT NULL,
    "other" TEXT,
    "otherDeduction" INTEGER NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "dateOfPayment" TIMESTAMP(3) NOT NULL,
    "ordinaryWage" INTEGER NOT NULL,
    "additionalWage" INTEGER NOT NULL,
    "allowance" INTEGER NOT NULL,
    "otPay" INTEGER NOT NULL,
    "otHours" INTEGER NOT NULL,
    "modeOfPayment" "ModeOfPayment" NOT NULL,
    "typeOfContributionRate" "ContributionRate" NOT NULL,
    "name" TEXT NOT NULL,
    "NRIC" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "nationality" "Nationality" NOT NULL,
    "citizenshipStatus" "CitizenshipStatus" NOT NULL,
    "companyName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_NRIC_key" ON "Employee"("NRIC");

-- CreateIndex
CREATE UNIQUE INDEX "Payslip_NRIC_key" ON "Payslip"("NRIC");
