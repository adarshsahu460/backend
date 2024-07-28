/*
  Warnings:

  - A unique constraint covering the columns `[profit]` on the table `Profit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profit_profit_key" ON "Profit"("profit");
