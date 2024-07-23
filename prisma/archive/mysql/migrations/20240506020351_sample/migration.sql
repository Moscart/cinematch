/*
  Warnings:

  - You are about to drop the `testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `testing`;

-- CreateTable
CREATE TABLE `Sample` (
    `adult` BOOLEAN NOT NULL,
    `backdrop_path` VARCHAR(191) NULL,
    `id` INTEGER NOT NULL,
    `genre_ids` VARCHAR(191) NOT NULL,
    `original_language` VARCHAR(191) NOT NULL,
    `original_title` VARCHAR(191) NOT NULL,
    `overview` TEXT NULL,
    `popularity` DECIMAL(10, 3) NULL,
    `poster_path` VARCHAR(191) NULL,
    `release_date` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `video` BOOLEAN NOT NULL,
    `vote_average` DECIMAL(10, 3) NULL,
    `vote_count` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `words` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
