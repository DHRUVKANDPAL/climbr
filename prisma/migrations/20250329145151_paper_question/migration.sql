-- CreateTable
CREATE TABLE "paperQuestion" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,

    CONSTRAINT "paperQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionTopaperQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "paperQuestion_paperId_key" ON "paperQuestion"("paperId");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionTopaperQuestion_AB_unique" ON "_QuestionTopaperQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionTopaperQuestion_B_index" ON "_QuestionTopaperQuestion"("B");

-- AddForeignKey
ALTER TABLE "paperQuestion" ADD CONSTRAINT "paperQuestion_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTopaperQuestion" ADD CONSTRAINT "_QuestionTopaperQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTopaperQuestion" ADD CONSTRAINT "_QuestionTopaperQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "paperQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
