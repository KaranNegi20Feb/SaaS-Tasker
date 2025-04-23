/*
  Warnings:

  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "organization";

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");
