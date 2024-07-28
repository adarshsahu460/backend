/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Profit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profit_profit_key";

-- CreateIndex
CREATE UNIQUE INDEX "Profit_date_key" ON "Profit"("date");
