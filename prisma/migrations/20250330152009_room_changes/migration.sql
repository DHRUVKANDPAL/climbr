/*
  Warnings:

  - You are about to drop the column `transitionFrom` on the `LanguageRooms` table. All the data in the column will be lost.
  - You are about to drop the column `transitionTo` on the `LanguageRooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LanguageRooms" DROP COLUMN "transitionFrom",
DROP COLUMN "transitionTo";

-- CreateTable
CREATE TABLE "Languages" (
    "name" TEXT NOT NULL,
    "languageRoomId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Languages_name_key" ON "Languages"("name");

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_languageRoomId_fkey" FOREIGN KEY ("languageRoomId") REFERENCES "LanguageRooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
