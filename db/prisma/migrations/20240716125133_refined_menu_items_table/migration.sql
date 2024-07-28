/*
  Warnings:

  - A unique constraint covering the columns `[adminId,name]` on the table `MenuItems` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MenuItems" ALTER COLUMN "description" SET DEFAULT 'a',
ALTER COLUMN "image" SET DEFAULT 'a',
ALTER COLUMN "category" SET DEFAULT 'a';

-- CreateIndex
CREATE UNIQUE INDEX "MenuItems_adminId_name_key" ON "MenuItems"("adminId", "name");
