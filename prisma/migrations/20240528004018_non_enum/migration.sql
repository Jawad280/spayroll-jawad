/*
  Warnings:

  - The `typeOfContributionRate` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `typeOfContributionRate` column on the `Payslip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `nationality` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `citizenshipStatus` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modeOfPayment` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modeOfPayment` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nationality` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `citizenshipStatus` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "nationality",
ADD COLUMN     "nationality" TEXT NOT NULL,
DROP COLUMN "citizenshipStatus",
ADD COLUMN     "citizenshipStatus" TEXT NOT NULL,
DROP COLUMN "modeOfPayment",
ADD COLUMN     "modeOfPayment" TEXT NOT NULL,
DROP COLUMN "typeOfContributionRate",
ADD COLUMN     "typeOfContributionRate" TEXT;

-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "modeOfPayment",
ADD COLUMN     "modeOfPayment" TEXT NOT NULL,
DROP COLUMN "typeOfContributionRate",
ADD COLUMN     "typeOfContributionRate" TEXT,
DROP COLUMN "nationality",
ADD COLUMN     "nationality" TEXT NOT NULL,
DROP COLUMN "citizenshipStatus",
ADD COLUMN     "citizenshipStatus" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CitizenshipStatus";

-- DropEnum
DROP TYPE "ContributionRate";

-- DropEnum
DROP TYPE "ModeOfPayment";

-- DropEnum
DROP TYPE "Nationality";
