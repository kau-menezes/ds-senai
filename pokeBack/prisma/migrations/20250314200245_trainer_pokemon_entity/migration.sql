/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `trainer` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `TrainerPokemon` (
    `trainerId` INTEGER NOT NULL,
    `pokemonId` INTEGER NOT NULL,

    PRIMARY KEY (`trainerId`, `pokemonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TrainerPokemon` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TrainerPokemon_AB_unique`(`A`, `B`),
    INDEX `_TrainerPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Trainer_email_key` ON `Trainer`(`email`);

-- AddForeignKey
ALTER TABLE `TrainerPokemon` ADD CONSTRAINT `TrainerPokemon_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `Trainer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainerPokemon` ADD CONSTRAINT `TrainerPokemon_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrainerPokemon` ADD CONSTRAINT `_TrainerPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TrainerPokemon` ADD CONSTRAINT `_TrainerPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Trainer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
