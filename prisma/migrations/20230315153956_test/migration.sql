/*
  Warnings:

  - Made the column `message` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "message" SET DEFAULT 'This goes towards the restoration of the forest corridor along the Lower Kinabatangan, Sabah, malaysia, Borneo.';
