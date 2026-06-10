/*
  Warnings:

  - You are about to drop the column `price` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_type` on the `Rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "price",
DROP COLUMN "room_type";

-- CreateTable
CREATE TABLE "Room_types" (
    "id" SERIAL NOT NULL,
    "roomType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "bathType" TEXT NOT NULL,
    "viewType" TEXT NOT NULL,

    CONSTRAINT "Room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookingRoomToRoom_types" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookingRoomToRoom_types_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookingRoomToRoom_types_B_index" ON "_BookingRoomToRoom_types"("B");

-- AddForeignKey
ALTER TABLE "_BookingRoomToRoom_types" ADD CONSTRAINT "_BookingRoomToRoom_types_A_fkey" FOREIGN KEY ("A") REFERENCES "BookingRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingRoomToRoom_types" ADD CONSTRAINT "_BookingRoomToRoom_types_B_fkey" FOREIGN KEY ("B") REFERENCES "Room_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
