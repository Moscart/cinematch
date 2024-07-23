-- AlterTable
ALTER TABLE `movie` MODIFY `popularity` DECIMAL(20, 3) NOT NULL,
    MODIFY `vote_average` DECIMAL(20, 3) NOT NULL;
