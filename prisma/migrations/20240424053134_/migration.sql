/*
  Warnings:

  - You are about to alter the column `popularity` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,3)` to `Float`.
  - You are about to alter the column `vote_average` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,3)` to `Float`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `popularity` FLOAT NOT NULL,
    MODIFY `vote_average` FLOAT NOT NULL;
