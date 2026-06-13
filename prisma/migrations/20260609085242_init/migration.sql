/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `is_occupied` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `roomtypes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomNumber]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `roomtypes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_user_id_fkey";

-- DropIndex
DROP INDEX "Rooms_room_number_key";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "customer_id",
DROP COLUMN "user_id",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "booking_id",
DROP COLUMN "payment_date",
DROP COLUMN "payment_method",
ADD COLUMN     "bookingId" INTEGER NOT NULL,
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "is_occupied",
DROP COLUMN "room_number",
ADD COLUMN     "isOccupied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roomNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roomtypes" DROP COLUMN "img_url",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_roomNumber_key" ON "Rooms"("roomNumber");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
