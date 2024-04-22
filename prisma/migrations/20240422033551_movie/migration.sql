-- CreateTable
CREATE TABLE `Movie` (
    `adult` BOOLEAN NOT NULL,
    `backdrop_path` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL,
    `genre_ids` VARCHAR(191) NOT NULL,
    `original_title` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL,
    `poster_path` VARCHAR(191) NOT NULL,
    `release_date` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `vote_average` INTEGER NOT NULL,
    `vote_count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
