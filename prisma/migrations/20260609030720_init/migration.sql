/*
  Warnings:

  - You are about to drop the column `booking_id` on the `BookingRoom` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `BookingRoom` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Bookings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId,roomId]` on the table `BookingRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `BookingRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `BookingRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTypeId` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingRoom" DROP COLUMN "booking_id",
DROP COLUMN "room_id",
ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "roomTypeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookingRoom_bookingId_roomId_key" ON "BookingRoom"("bookingId", "roomId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "Room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRoom" ADD CONSTRAINT "BookingRoom_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRoom" ADD CONSTRAINT "BookingRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
