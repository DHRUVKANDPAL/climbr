/*
  Warnings:

  - You are about to drop the column `examId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_examId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "examId";
