/*
  Warnings:

  - Added the required column `passwordSalt` to the `AppUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppUser" ADD COLUMN     "passwordSalt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "message" TEXT;
