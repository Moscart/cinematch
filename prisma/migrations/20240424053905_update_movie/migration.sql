/*
  Warnings:

  - You are about to alter the column `popularity` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,3)` to `Decimal(10,3)`.
  - You are about to alter the column `vote_average` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,3)` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `popularity` DECIMAL(10, 3) NOT NULL,
    MODIFY `vote_average` DECIMAL(10, 3) NOT NULL;
