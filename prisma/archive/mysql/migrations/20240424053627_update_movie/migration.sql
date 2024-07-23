-- AlterTable
ALTER TABLE `movie` MODIFY `popularity` DECIMAL(3, 3) NOT NULL,
    MODIFY `vote_average` DECIMAL(3, 3) NOT NULL;
