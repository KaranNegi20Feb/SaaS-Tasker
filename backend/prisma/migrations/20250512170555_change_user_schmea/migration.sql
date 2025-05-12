-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "twitterUrl" TEXT;
