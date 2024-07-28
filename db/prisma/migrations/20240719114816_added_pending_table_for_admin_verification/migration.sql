-- CreateTable
CREATE TABLE "Pending" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Pending_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pending" ADD CONSTRAINT "Pending_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
