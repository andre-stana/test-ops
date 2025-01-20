/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserService` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserService_serviceId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserService_userId_key" ON "UserService"("userId");
