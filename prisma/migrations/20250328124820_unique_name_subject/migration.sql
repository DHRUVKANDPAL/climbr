/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subjects_name_key" ON "Subjects"("name");
