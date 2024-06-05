/*
  Warnings:

  - The primary key for the `Payslip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Payslip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payslip" DROP CONSTRAINT "Payslip_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Payslip_pkey" PRIMARY KEY ("NRIC", "monthYear", "companyName");
