-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPremiumUser" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "LanguageRooms" (
    "roomId" TEXT NOT NULL,
    "transitionFrom" TEXT NOT NULL,
    "transitionTo" TEXT NOT NULL,

    CONSTRAINT "LanguageRooms_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "StudyRoom" (
    "roomId" TEXT NOT NULL,

    CONSTRAINT "StudyRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "ConsultingRoom" (
    "roomId" TEXT NOT NULL,

    CONSTRAINT "ConsultingRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Label" (
    "name" TEXT NOT NULL,
    "consultingRoomId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MentalHealthRoom" (
    "roomId" TEXT NOT NULL,

    CONSTRAINT "MentalHealthRoom_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "orderCreationId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpayOrderId" TEXT,
    "razorpaySignature" TEXT,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_consultingRoomId_fkey" FOREIGN KEY ("consultingRoomId") REFERENCES "ConsultingRoom"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
