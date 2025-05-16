-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_lotId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "lotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ParkingLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
