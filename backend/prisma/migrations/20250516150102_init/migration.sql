/*
  Warnings:

  - The primary key for the `vehicles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `vehicles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `vehicle_id` on the `reservations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "vehicle_id",
ADD COLUMN     "vehicle_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
