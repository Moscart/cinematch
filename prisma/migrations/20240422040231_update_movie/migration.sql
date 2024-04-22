/*
  Warnings:

  - Added the required column `video` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `video` BOOLEAN NOT NULL;
