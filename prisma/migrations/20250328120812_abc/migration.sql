-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creditPoints" INTEGER DEFAULT 0,
    "leaderBoardPoints" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swot" (
    "id" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "weaknesses" TEXT NOT NULL,
    "opportunities" TEXT NOT NULL,
    "threats" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Swot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedQuestion" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "weightage" INTEGER NOT NULL DEFAULT 4,
    "negativeMarking" INTEGER NOT NULL DEFAULT -1,
    "examId" TEXT,
    "difficulty" "DifficultyLevel" NOT NULL DEFAULT 'Medium',
    "explanation" TEXT,
    "sectionId" TEXT,
    "savedQuestionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAnalytics" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "timeTakenToSolveInMinutes" INTEGER NOT NULL,

    CONSTRAINT "QuestionAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagramUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "DiagramUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionDemographics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timeTakenToSolveInMinutes" INTEGER NOT NULL,
    "isCorrect" BOOLEAN,
    "isAttempted" BOOLEAN,
    "isMarkedForReview" BOOLEAN,
    "isGuessed" BOOLEAN,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "SectionDemographics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeDurationInMinutes" INTEGER NOT NULL,
    "examId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperAnalytics" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timeTakenInMinutes" INTEGER NOT NULL,
    "marksObtained" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "incorrectAnswers" INTEGER NOT NULL,
    "solvedQuestions" INTEGER NOT NULL,
    "unattemptedQuestions" INTEGER NOT NULL,
    "accuracyPercentage" DOUBLE PRECISION NOT NULL,
    "timePerQuestionInSeconds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PaperAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practice" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topicWiseAccuracy" (
    "topicId" TEXT NOT NULL,
    "noOfCorrectQuestions" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Friendship" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedQuestionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamsToSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PracticeToSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PracticeToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PracticeToQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Swot_userid_key" ON "Swot"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Question_savedQuestionId_key" ON "Question"("savedQuestionId");

-- CreateIndex
CREATE INDEX "Question_question_idx" ON "Question"("question");

-- CreateIndex
CREATE INDEX "Topic_name_idx" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "Exams_name_idx" ON "Exams"("name");

-- CreateIndex
CREATE INDEX "Paper_name_idx" ON "Paper"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaperAnalytics_paperId_key" ON "PaperAnalytics"("paperId");

-- CreateIndex
CREATE UNIQUE INDEX "topicWiseAccuracy_topicId_key" ON "topicWiseAccuracy"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "_Friendship"("A", "B");

-- CreateIndex
CREATE INDEX "_Friendship_B_index" ON "_Friendship"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedQuestionToUser_AB_unique" ON "_SavedQuestionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedQuestionToUser_B_index" ON "_SavedQuestionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToSubjects_AB_unique" ON "_QuestionToSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToSubjects_B_index" ON "_QuestionToSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTopic_AB_unique" ON "_QuestionToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTopic_B_index" ON "_QuestionToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamsToSubjects_AB_unique" ON "_ExamsToSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamsToSubjects_B_index" ON "_ExamsToSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PracticeToSubjects_AB_unique" ON "_PracticeToSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_PracticeToSubjects_B_index" ON "_PracticeToSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PracticeToTopic_AB_unique" ON "_PracticeToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_PracticeToTopic_B_index" ON "_PracticeToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PracticeToQuestion_AB_unique" ON "_PracticeToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_PracticeToQuestion_B_index" ON "_PracticeToQuestion"("B");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swot" ADD CONSTRAINT "Swot_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_savedQuestionId_fkey" FOREIGN KEY ("savedQuestionId") REFERENCES "SavedQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAnalytics" ADD CONSTRAINT "QuestionAnalytics_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramUrl" ADD CONSTRAINT "DiagramUrl_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionDemographics" ADD CONSTRAINT "SectionDemographics_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperAnalytics" ADD CONSTRAINT "PaperAnalytics_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperAnalytics" ADD CONSTRAINT "PaperAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topicWiseAccuracy" ADD CONSTRAINT "topicWiseAccuracy_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedQuestionToUser" ADD CONSTRAINT "_SavedQuestionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedQuestionToUser" ADD CONSTRAINT "_SavedQuestionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSubjects" ADD CONSTRAINT "_QuestionToSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSubjects" ADD CONSTRAINT "_QuestionToSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTopic" ADD CONSTRAINT "_QuestionToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTopic" ADD CONSTRAINT "_QuestionToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamsToSubjects" ADD CONSTRAINT "_ExamsToSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamsToSubjects" ADD CONSTRAINT "_ExamsToSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToSubjects" ADD CONSTRAINT "_PracticeToSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToSubjects" ADD CONSTRAINT "_PracticeToSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToTopic" ADD CONSTRAINT "_PracticeToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToTopic" ADD CONSTRAINT "_PracticeToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToQuestion" ADD CONSTRAINT "_PracticeToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PracticeToQuestion" ADD CONSTRAINT "_PracticeToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
