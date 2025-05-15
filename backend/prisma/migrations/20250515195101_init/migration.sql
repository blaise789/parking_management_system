/*
  Warnings:

  - You are about to drop the column `operatingHours` on the `ParkingLot` table. All the data in the column will be lost.
  - Added the required column `closing_time` to the `ParkingLot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_time` to the `ParkingLot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingLot" DROP COLUMN "operatingHours",
ADD COLUMN     "closing_time" TEXT NOT NULL,
ADD COLUMN     "opening_time" TEXT NOT NULL;
