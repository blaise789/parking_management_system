/*
  Warnings:

  - You are about to drop the `ParkingLot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParkingSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AssignedClerks` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "vehicle_type" AS ENUM ('CAR', 'MOTORCYCLE', 'TRUCK');

-- CreateEnum
CREATE TYPE "vehicle_size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "slot_status" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "reservation_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "parking_location" AS ENUM ('NORTH', 'SOUTH', 'EAST', 'WEST');

-- DropForeignKey
ALTER TABLE "ParkingSlot" DROP CONSTRAINT "ParkingSlot_lotId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_lotId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_slotId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_clerkId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AssignedClerks" DROP CONSTRAINT "_AssignedClerks_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssignedClerks" DROP CONSTRAINT "_AssignedClerks_B_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'DRIVER';

-- DropTable
DROP TABLE "ParkingLot";

-- DropTable
DROP TABLE "ParkingSlot";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "Ticket";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "_AssignedClerks";

-- DropEnum
DROP TYPE "ReservationStatus";

-- DropEnum
DROP TYPE "SlotType";

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "vehicle_type" "vehicle_type" NOT NULL,
    "size" "vehicle_size" NOT NULL,
    "attributes" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking_slots" (
    "id" TEXT NOT NULL,
    "slot_number" TEXT NOT NULL,
    "size" "vehicle_size" NOT NULL,
    "vehicle_type" "vehicle_type" NOT NULL,
    "location" "parking_location" NOT NULL,
    "status" "slot_status" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "slot_id" TEXT,
    "slot_number" TEXT,
    "status" "reservation_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_number_key" ON "vehicles"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "parking_slots_slot_number_key" ON "parking_slots"("slot_number");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "parking_slots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
