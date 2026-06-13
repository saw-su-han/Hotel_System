/*
  Warnings:

  - You are about to drop the column `nrcImage` on the `Customers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nrcFront]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nrcBack]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nrcBack` to the `Customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nrcFront` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customers_nrcImage_key";

-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "nrcImage",
ADD COLUMN     "nrcBack" TEXT NOT NULL,
ADD COLUMN     "nrcFront" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customers_nrcFront_key" ON "Customers"("nrcFront");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_nrcBack_key" ON "Customers"("nrcBack");
