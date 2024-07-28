/*
  Warnings:

  - You are about to drop the column `adminId` on the `Pending` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Pending` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Pending` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Pending` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pending` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Pending` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pending" DROP CONSTRAINT "Pending_adminId_fkey";

-- AlterTable
ALTER TABLE "Pending" DROP COLUMN "adminId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pending_email_key" ON "Pending"("email");
