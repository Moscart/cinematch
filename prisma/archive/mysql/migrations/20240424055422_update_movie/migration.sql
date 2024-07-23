/*
  Warnings:

  - You are about to alter the column `popularity` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Double`.
  - You are about to alter the column `vote_average` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,3)` to `Double`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `popularity` DOUBLE NOT NULL,
    MODIFY `vote_average` DOUBLE NOT NULL;
