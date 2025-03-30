/*
  Warnings:

  - A unique constraint covering the columns `[languageRoomId]` on the table `Languages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Languages_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Languages_languageRoomId_key" ON "Languages"("languageRoomId");
