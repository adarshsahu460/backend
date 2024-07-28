-- CreateTable
CREATE TABLE "Profit" (
    "id" SERIAL NOT NULL,
    "profit" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profit_pkey" PRIMARY KEY ("id")
);
