/*
  Warnings:

  - A unique constraint covering the columns `[userId,serviceName]` on the table `UserService` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserService_userId_serviceName_key" ON "UserService"("userId", "serviceName");
