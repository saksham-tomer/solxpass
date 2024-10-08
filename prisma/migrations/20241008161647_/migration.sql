/*
  Warnings:

  - You are about to drop the column `providers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `signatures` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "providers",
DROP COLUMN "signatures",
ADD COLUMN     "userscore" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "signatures" TEXT[],
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Providers" ADD CONSTRAINT "Providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
