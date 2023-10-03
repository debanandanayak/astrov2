-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NULL,
    `place_of_birth` VARCHAR(191) NULL,
    `date_of_birth` VARCHAR(191) NULL,
    `time_of_birth` DATETIME(3) NULL,
    `status` ENUM('active', 'inactive') NULL,
    `otp` INTEGER NULL,
    `otp_expired_in` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phone_number_key`(`phone_number`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Astrologer` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `career_start` DATETIME(3) NULL,
    `gender` ENUM('male', 'female', 'other') NULL,
    `status` ENUM('active', 'inactive') NULL,
    `image` VARCHAR(191) NULL,
    `short_bio` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Astrologer_email_key`(`email`),
    UNIQUE INDEX `Astrologer_phone_key`(`phone`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leave` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `astrologer_id` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `astrologer_type` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `astrologer_type_type_key`(`type`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shortcut` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `shortcut` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `astrologer_id` INTEGER NOT NULL,

    UNIQUE INDEX `Shortcut_astrologer_id_shortcut_key`(`astrologer_id`, `shortcut`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `language_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `blog_PostID` INTEGER NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog_Post` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `astrologer_id` INTEGER NULL,
    `admin_id` INTEGER NULL,
    `tag_id` INTEGER NULL,
    `created_by` ENUM('user', 'astroloer', 'admin') NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `astrologer_id` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `sender` ENUM('user', 'astroloer') NOT NULL,
    `userId` INTEGER NULL,
    `astrologer_id` INTEGER NULL,
    `conversation_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAstrologer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `astrologer_id` INTEGER NOT NULL,

    UNIQUE INDEX `UserAstrologer_user_id_astrologer_id_key`(`user_id`, `astrologer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AstrologerToLanguage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AstrologerToLanguage_AB_unique`(`A`, `B`),
    INDEX `_AstrologerToLanguage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AstrologerToAstrologerType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AstrologerToAstrologerType_AB_unique`(`A`, `B`),
    INDEX `_AstrologerToAstrologerType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserToAstrologer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserToAstrologer_AB_unique`(`A`, `B`),
    INDEX `_UserToAstrologer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Blog_PostToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Blog_PostToTag_AB_unique`(`A`, `B`),
    INDEX `_Blog_PostToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_astrologer_id_fkey` FOREIGN KEY (`astrologer_id`) REFERENCES `Astrologer`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shortcut` ADD CONSTRAINT `Shortcut_astrologer_id_fkey` FOREIGN KEY (`astrologer_id`) REFERENCES `Astrologer`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog_Post` ADD CONSTRAINT `Blog_Post_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog_Post` ADD CONSTRAINT `Blog_Post_astrologer_id_fkey` FOREIGN KEY (`astrologer_id`) REFERENCES `Astrologer`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog_Post` ADD CONSTRAINT `Blog_Post_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_astrologer_id_fkey` FOREIGN KEY (`astrologer_id`) REFERENCES `Astrologer`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversation_id_fkey` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAstrologer` ADD CONSTRAINT `UserAstrologer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAstrologer` ADD CONSTRAINT `UserAstrologer_astrologer_id_fkey` FOREIGN KEY (`astrologer_id`) REFERENCES `Astrologer`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AstrologerToLanguage` ADD CONSTRAINT `_AstrologerToLanguage_A_fkey` FOREIGN KEY (`A`) REFERENCES `Astrologer`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AstrologerToLanguage` ADD CONSTRAINT `_AstrologerToLanguage_B_fkey` FOREIGN KEY (`B`) REFERENCES `Language`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AstrologerToAstrologerType` ADD CONSTRAINT `_AstrologerToAstrologerType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Astrologer`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AstrologerToAstrologerType` ADD CONSTRAINT `_AstrologerToAstrologerType_B_fkey` FOREIGN KEY (`B`) REFERENCES `astrologer_type`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToAstrologer` ADD CONSTRAINT `_UserToAstrologer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Astrologer`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToAstrologer` ADD CONSTRAINT `_UserToAstrologer_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Blog_PostToTag` ADD CONSTRAINT `_Blog_PostToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Blog_Post`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Blog_PostToTag` ADD CONSTRAINT `_Blog_PostToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
