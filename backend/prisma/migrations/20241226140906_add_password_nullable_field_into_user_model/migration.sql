/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_name_key" ON "Reaction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
