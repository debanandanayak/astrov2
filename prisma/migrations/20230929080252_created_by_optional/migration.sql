-- DropIndex
DROP INDEX `Blog_Post_admin_id_fkey` ON `blog_post`;

-- DropIndex
DROP INDEX `Blog_Post_astrologer_id_fkey` ON `blog_post`;

-- DropIndex
DROP INDEX `Blog_Post_category_id_fkey` ON `blog_post`;

-- DropIndex
DROP INDEX `Conversation_user_id_fkey` ON `conversation`;

-- DropIndex
DROP INDEX `Leave_astrologer_id_fkey` ON `leave`;

-- DropIndex
DROP INDEX `Message_conversation_id_fkey` ON `message`;

-- DropIndex
DROP INDEX `UserAstrologer_astrologer_id_fkey` ON `userastrologer`;

-- AlterTable
ALTER TABLE `blog_post` MODIFY `created_by` ENUM('user', 'astrologer', 'admin') NULL;

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
