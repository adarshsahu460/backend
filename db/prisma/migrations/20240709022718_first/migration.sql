/*
  Warnings:

  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobile" TEXT NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0;
