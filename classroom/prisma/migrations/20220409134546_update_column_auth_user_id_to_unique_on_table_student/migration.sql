/*
  Warnings:

  - A unique constraint covering the columns `[auth_user_id]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_auth_user_id_key" ON "student"("auth_user_id");
