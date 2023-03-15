/*
  Warnings:

  - Made the column `isCoordRequired` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_planter_id_fkey";

-- DropIndex
DROP INDEX "Tree_latitude_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isCoordRequired" SET NOT NULL,
ALTER COLUMN "planter_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tree" ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_planter_id_fkey" FOREIGN KEY ("planter_id") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
