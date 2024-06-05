/*
  Warnings:

  - A unique constraint covering the columns `[NRIC,monthYear,companyName]` on the table `Payslip` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Payslip_NRIC_key";

-- CreateIndex
CREATE UNIQUE INDEX "Payslip_NRIC_monthYear_companyName_key" ON "Payslip"("NRIC", "monthYear", "companyName");
