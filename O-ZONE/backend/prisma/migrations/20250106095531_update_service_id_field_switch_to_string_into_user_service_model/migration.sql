/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `UserService` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `UserService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserService" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserService_serviceId_key" ON "UserService"("serviceId");
