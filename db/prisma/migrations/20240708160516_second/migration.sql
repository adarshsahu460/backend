/*
  Warnings:

  - You are about to drop the `_MenuItemsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MenuItemsToUser" DROP CONSTRAINT "_MenuItemsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemsToUser" DROP CONSTRAINT "_MenuItemsToUser_B_fkey";

-- DropTable
DROP TABLE "_MenuItemsToUser";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "MenuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
