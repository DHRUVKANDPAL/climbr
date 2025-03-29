/*
  Warnings:

  - You are about to drop the column `paperId` on the `Section` table. All the data in the column will be lost.
  - Added the required column `examId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_paperId_fkey";

-- DropIndex
DROP INDEX "Section_paperId_idx";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "paperId",
ADD COLUMN     "examId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
