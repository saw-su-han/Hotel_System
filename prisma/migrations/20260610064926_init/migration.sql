/*
  Warnings:

  - A unique constraint covering the columns `[nrcImage]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nrcImage` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "nrcImage" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customers_nrcImage_key" ON "Customers"("nrcImage");
