/*
  Warnings:

  - A unique constraint covering the columns `[roomType]` on the table `roomtypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "roomtypes_roomType_key" ON "roomtypes"("roomType");
