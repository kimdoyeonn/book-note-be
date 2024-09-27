/*
  Warnings:

  - You are about to drop the `UserBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_userId_fkey";

-- DropIndex
DROP INDEX "Book_isbn_key";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "UserBook";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
