/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OTP_otp_key";

-- CreateIndex
CREATE UNIQUE INDEX "OTP_userId_key" ON "OTP"("userId");
