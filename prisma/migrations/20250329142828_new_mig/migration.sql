/*
  Warnings:

  - Added the required column `examId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "examId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
