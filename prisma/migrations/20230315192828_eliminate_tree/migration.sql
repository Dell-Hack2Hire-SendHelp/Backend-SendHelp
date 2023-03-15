/*
  Warnings:

  - You are about to drop the `Tree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tree" DROP CONSTRAINT "Tree_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "image" TEXT,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;

-- DropTable
DROP TABLE "Tree";
