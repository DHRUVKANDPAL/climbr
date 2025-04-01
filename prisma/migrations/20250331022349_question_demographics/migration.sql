-- CreateTable
CREATE TABLE "QuestionPaperAnalytics" (
    "id" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timeSpentInSeconds" INTEGER NOT NULL,
    "paperQuestionId" TEXT NOT NULL,

    CONSTRAINT "QuestionPaperAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPaperAnalytics_paperQuestionId_key" ON "QuestionPaperAnalytics"("paperQuestionId");

-- AddForeignKey
ALTER TABLE "QuestionPaperAnalytics" ADD CONSTRAINT "QuestionPaperAnalytics_paperQuestionId_fkey" FOREIGN KEY ("paperQuestionId") REFERENCES "paperQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
