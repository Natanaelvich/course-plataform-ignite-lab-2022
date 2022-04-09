/*
  Warnings:

  - You are about to drop the column `authUserid` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_user_id]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "customer_authUserid_key";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "authUserid",
ADD COLUMN     "auth_user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "customer_auth_user_id_key" ON "customer"("auth_user_id");
