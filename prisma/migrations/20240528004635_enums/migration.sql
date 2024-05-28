/*
  Warnings:

  - The `typeOfContributionRate` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `joinDate` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isResigned` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `nationality` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `citizenshipStatus` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `modeOfPayment` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modeOfPayment` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `typeOfContributionRate` to the `Payslip` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `nationality` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `citizenshipStatus` on the `Payslip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('SC', 'Foreigner', 'PR');

-- CreateEnum
CREATE TYPE "CitizenshipStatus" AS ENUM ('SCPR1', 'SCPR2', 'SCPR3');

-- CreateEnum
CREATE TYPE "ModeOfPayment" AS ENUM ('Cheque', 'Cash', 'BankDeposit');

-- CreateEnum
CREATE TYPE "ContributionRate" AS ENUM ('FG', 'GG');

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "joinDate" SET NOT NULL,
ALTER COLUMN "isResigned" SET NOT NULL,
DROP COLUMN "nationality",
ADD COLUMN     "nationality" "Nationality" NOT NULL,
DROP COLUMN "citizenshipStatus",
ADD COLUMN     "citizenshipStatus" "CitizenshipStatus" NOT NULL,
DROP COLUMN "modeOfPayment",
ADD COLUMN     "modeOfPayment" "ModeOfPayment" NOT NULL,
DROP COLUMN "typeOfContributionRate",
ADD COLUMN     "typeOfContributionRate" "ContributionRate";

-- AlterTable
ALTER TABLE "Payslip" DROP COLUMN "modeOfPayment",
ADD COLUMN     "modeOfPayment" "ModeOfPayment" NOT NULL,
DROP COLUMN "typeOfContributionRate",
ADD COLUMN     "typeOfContributionRate" "ContributionRate" NOT NULL,
DROP COLUMN "nationality",
ADD COLUMN     "nationality" "Nationality" NOT NULL,
DROP COLUMN "citizenshipStatus",
ADD COLUMN     "citizenshipStatus" "CitizenshipStatus" NOT NULL;
