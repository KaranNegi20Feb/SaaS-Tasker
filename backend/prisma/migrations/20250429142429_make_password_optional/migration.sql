-- AlterTable
ALTER TABLE "users" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider" DROP DEFAULT;
