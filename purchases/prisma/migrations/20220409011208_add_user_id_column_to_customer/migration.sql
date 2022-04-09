/*
  Warnings:

  - A unique constraint covering the columns `[authUserid]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "authUserid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_authUserid_key" ON "customer"("authUserid");
