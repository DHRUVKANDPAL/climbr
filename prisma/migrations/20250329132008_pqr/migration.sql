/*
  Warnings:

  - You are about to drop the column `name` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Section` table. All the data in the column will be lost.
  - Added the required column `type` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MCQ', 'Numerical');

-- DropIndex
DROP INDEX "Exams_name_idx";

-- DropIndex
DROP INDEX "Section_name_idx";

-- DropIndex
DROP INDEX "Section_name_key";

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "name",
ADD COLUMN     "type" TEXT NOT NULL;
