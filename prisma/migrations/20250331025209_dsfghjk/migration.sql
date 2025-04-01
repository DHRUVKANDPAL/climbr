/*
  Warnings:

  - You are about to drop the `QuestionPaperAnalytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionPaperAnalytics" DROP CONSTRAINT "QuestionPaperAnalytics_paperQuestionId_fkey";

-- DropTable
DROP TABLE "QuestionPaperAnalytics";

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "timeSpent" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "numericId" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "selectedOptionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timeSpentInSec" INTEGER NOT NULL,
    "submissionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionStats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeSpentInSec" INTEGER NOT NULL,
    "questionAnswered" INTEGER NOT NULL,
    "questionsTotal" INTEGER NOT NULL,
    "submissionId" TEXT NOT NULL,

    CONSTRAINT "SectionStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary" (
    "id" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "answered" INTEGER NOT NULL,
    "notAnswered" INTEGER NOT NULL,
    "notVisited" INTEGER NOT NULL,
    "markedForReview" INTEGER NOT NULL,
    "markedReviewAnswered" INTEGER NOT NULL,
    "guessed" INTEGER NOT NULL,
    "submissionId" TEXT NOT NULL,

    CONSTRAINT "summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "summary_submissionId_key" ON "summary"("submissionId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionStats" ADD CONSTRAINT "SectionStats_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
