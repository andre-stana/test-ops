/*
  Warnings:

  - A unique constraint covering the columns `[userId,serviceId,serviceName]` on the table `UserService` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserService_userId_key";

-- DropIndex
DROP INDEX "UserService_userId_serviceName_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserService_userId_serviceId_serviceName_key" ON "UserService"("userId", "serviceId", "serviceName");
