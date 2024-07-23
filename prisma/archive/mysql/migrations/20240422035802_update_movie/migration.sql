/*
  Warnings:

  - Added the required column `original_language` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `original_language` VARCHAR(191) NOT NULL,
    MODIFY `backdrop_path` VARCHAR(191) NULL,
    MODIFY `overview` VARCHAR(191) NULL,
    MODIFY `poster_path` VARCHAR(191) NULL;
