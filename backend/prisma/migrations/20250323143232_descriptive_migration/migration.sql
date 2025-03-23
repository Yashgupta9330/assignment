/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Doctor_name_key" ON "Doctor"("name");
