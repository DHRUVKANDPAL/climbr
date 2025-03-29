/*
  Warnings:

  - You are about to drop the column `name` on the `SectionDemographics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SectionDemographics" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "DiagramUrl_questionId_idx" ON "DiagramUrl"("questionId");

-- CreateIndex
CREATE INDEX "FriendRequest_senderId_idx" ON "FriendRequest"("senderId");

-- CreateIndex
CREATE INDEX "FriendRequest_receiverId_idx" ON "FriendRequest"("receiverId");

-- CreateIndex
CREATE INDEX "Options_questionId_idx" ON "Options"("questionId");

-- CreateIndex
CREATE INDEX "Paper_userId_idx" ON "Paper"("userId");

-- CreateIndex
CREATE INDEX "Paper_examId_idx" ON "Paper"("examId");

-- CreateIndex
CREATE INDEX "Paper_createdAt_idx" ON "Paper"("createdAt");

-- CreateIndex
CREATE INDEX "Paper_updatedAt_idx" ON "Paper"("updatedAt");

-- CreateIndex
CREATE INDEX "PaperAnalytics_userId_idx" ON "PaperAnalytics"("userId");

-- CreateIndex
CREATE INDEX "PaperAnalytics_paperId_idx" ON "PaperAnalytics"("paperId");

-- CreateIndex
CREATE INDEX "Question_sectionId_idx" ON "Question"("sectionId");

-- CreateIndex
CREATE INDEX "Question_examId_idx" ON "Question"("examId");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_questionId_idx" ON "QuestionAnalytics"("questionId");

-- CreateIndex
CREATE INDEX "QuestionAnalytics_timeTakenToSolveInMinutes_idx" ON "QuestionAnalytics"("timeTakenToSolveInMinutes");

-- CreateIndex
CREATE INDEX "Section_paperId_idx" ON "Section"("paperId");

-- CreateIndex
CREATE INDEX "SectionDemographics_sectionId_idx" ON "SectionDemographics"("sectionId");

-- CreateIndex
CREATE INDEX "Swot_userid_idx" ON "Swot"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "topicWiseAccuracy_topicId_idx" ON "topicWiseAccuracy"("topicId");
