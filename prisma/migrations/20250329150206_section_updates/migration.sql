/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `numberOfQuestions` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- DropIndex
DROP INDEX "Question_sectionId_idx";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sectionId";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "numberOfQuestions" INTEGER NOT NULL;
