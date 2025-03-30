/*
  Warnings:

  - You are about to drop the column `negativeMarking` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `weightage` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "negativeMarking",
DROP COLUMN "weightage";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "negativeMarking" INTEGER,
ADD COLUMN     "weightage" INTEGER;

-- CreateTable
CREATE TABLE "PaperQuestionAnalytics" (
    "id" TEXT NOT NULL,
    "paperQuestionId" TEXT NOT NULL,
    "timeTakenToSolveInMinutes" INTEGER NOT NULL,
    "isCorrect" BOOLEAN,
    "isAttempted" BOOLEAN,
    "isMarkedForReview" BOOLEAN,
    "isGuessed" BOOLEAN,

    CONSTRAINT "PaperQuestionAnalytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaperQuestionAnalytics" ADD CONSTRAINT "PaperQuestionAnalytics_paperQuestionId_fkey" FOREIGN KEY ("paperQuestionId") REFERENCES "paperQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
