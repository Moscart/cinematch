/*
  Warnings:

  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `words` on table `movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    MODIFY `words` VARCHAR(191) NOT NULL;
