/*
  Warnings:

  - You are about to drop the `Room_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookingRoomToRoom_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_roomTypeId_fkey";

-- DropForeignKey
ALTER TABLE "_BookingRoomToRoom_types" DROP CONSTRAINT "_BookingRoomToRoom_types_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingRoomToRoom_types" DROP CONSTRAINT "_BookingRoomToRoom_types_B_fkey";

-- DropTable
DROP TABLE "Room_types";

-- DropTable
DROP TABLE "_BookingRoomToRoom_types";

-- CreateTable
CREATE TABLE "roomtypes" (
    "id" SERIAL NOT NULL,
    "roomType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "bathType" TEXT NOT NULL,
    "viewType" TEXT NOT NULL,

    CONSTRAINT "roomtypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookingRoomToroomtypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookingRoomToroomtypes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookingRoomToroomtypes_B_index" ON "_BookingRoomToroomtypes"("B");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "roomtypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingRoomToroomtypes" ADD CONSTRAINT "_BookingRoomToroomtypes_A_fkey" FOREIGN KEY ("A") REFERENCES "BookingRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingRoomToroomtypes" ADD CONSTRAINT "_BookingRoomToroomtypes_B_fkey" FOREIGN KEY ("B") REFERENCES "roomtypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
