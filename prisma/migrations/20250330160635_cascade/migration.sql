-- DropForeignKey
ALTER TABLE "Languages" DROP CONSTRAINT "Languages_languageRoomId_fkey";

-- CreateIndex
CREATE INDEX "Languages_languageRoomId_idx" ON "Languages"("languageRoomId");

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_languageRoomId_fkey" FOREIGN KEY ("languageRoomId") REFERENCES "LanguageRooms"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
