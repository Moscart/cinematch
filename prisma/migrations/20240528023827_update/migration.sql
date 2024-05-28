/*
  Warnings:

  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `session` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
