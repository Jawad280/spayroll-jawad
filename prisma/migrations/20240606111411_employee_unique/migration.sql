/*
  Warnings:

  - A unique constraint covering the columns `[NRIC,companyId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_NRIC_key";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_NRIC_companyId_key" ON "Employee"("NRIC", "companyId");
