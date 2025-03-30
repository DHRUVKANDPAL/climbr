/*
  Warnings:

  - The required column `id` was added to the `Languages` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Languages_languageRoomId_key";

-- AlterTable
ALTER TABLE "Languages" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Languages_pkey" PRIMARY KEY ("id");
