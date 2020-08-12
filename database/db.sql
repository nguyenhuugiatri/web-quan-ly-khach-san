/*
 Navicat Premium Data Transfer

 Source Server         : auction
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : db1

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 13/08/2020 00:28:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idRentReceipt` int(11) NULL DEFAULT NULL,
  `idUser` int(11) NULL DEFAULT NULL,
  `paymentDate` datetime(0) NULL DEFAULT NULL,
  `total` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idRentReceipt`(`idRentReceipt`) USING BTREE,
  INDEX `idUser`(`idUser`) USING BTREE,
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`idRentReceipt`) REFERENCES `rentreceipt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bookreceipt
-- ----------------------------
DROP TABLE IF EXISTS `bookreceipt`;
CREATE TABLE `bookreceipt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCustomer` int(11) NULL DEFAULT NULL,
  `dateIn` datetime(0) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idCustomer`(`idCustomer`) USING BTREE,
  CONSTRAINT `bookreceipt_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bookreceiptdetail
-- ----------------------------
DROP TABLE IF EXISTS `bookreceiptdetail`;
CREATE TABLE `bookreceiptdetail`  (
  `idBookReceipt` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  PRIMARY KEY (`idBookReceipt`, `idRoom`) USING BTREE,
  INDEX `idRoom`(`idRoom`) USING BTREE,
  CONSTRAINT `bookreceiptdetail_ibfk_1` FOREIGN KEY (`idBookReceipt`) REFERENCES `bookreceipt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookreceiptdetail_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idType` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `idNumber` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `isDelete` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idType`(`idType`) USING BTREE,
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `customertype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 1, 'Nguyễn Hữu Gia Trí', '0931467534', '261457481', 0);
INSERT INTO `customer` VALUES (2, 2, 'Huỳnh Thái Anh', '0821457888', '261783812', 0);
INSERT INTO `customer` VALUES (3, 1, 'Lê Hoài Bảo', '0931532566', '253212222', 0);
INSERT INTO `customer` VALUES (6, 1, 'AAAAAAAAAAAA', '1111111111', '1111111111', 0);
INSERT INTO `customer` VALUES (7, 2, 'ddddddddddd', '123123123213', '1122222123123', 0);
INSERT INTO `customer` VALUES (8, 2, '111111', '999998888', '111111111', 0);
INSERT INTO `customer` VALUES (9, 1, 'Thái Em', '1122334455', '1122334455', 0);

-- ----------------------------
-- Table structure for customertype
-- ----------------------------
DROP TABLE IF EXISTS `customertype`;
CREATE TABLE `customertype`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customertype
-- ----------------------------
INSERT INTO `customertype` VALUES (1, 'Local');
INSERT INTO `customertype` VALUES (2, 'Foreign');

-- ----------------------------
-- Table structure for rentreceipt
-- ----------------------------
DROP TABLE IF EXISTS `rentreceipt`;
CREATE TABLE `rentreceipt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCustomer` int(11) NULL DEFAULT NULL,
  `idUser` int(11) NULL DEFAULT NULL,
  `dateIn` datetime(0) NULL DEFAULT NULL,
  `dateOut` datetime(0) NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idCustomer`(`idCustomer`) USING BTREE,
  INDEX `idUser`(`idUser`) USING BTREE,
  CONSTRAINT `rentreceipt_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rentreceipt_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rentreceipt
-- ----------------------------
INSERT INTO `rentreceipt` VALUES (1, 6, 1, '2020-08-05 11:38:46', '2020-08-07 11:38:46', 300);
INSERT INTO `rentreceipt` VALUES (2, 7, 1, '2020-08-06 12:25:30', '2020-08-21 12:25:30', 400);
INSERT INTO `rentreceipt` VALUES (3, 8, 1, '2020-08-21 12:25:52', '2020-08-29 12:25:52', 400);
INSERT INTO `rentreceipt` VALUES (4, 9, 1, '2020-08-15 12:26:28', '2020-08-22 12:26:28', 200);

-- ----------------------------
-- Table structure for rentreceiptdetail
-- ----------------------------
DROP TABLE IF EXISTS `rentreceiptdetail`;
CREATE TABLE `rentreceiptdetail`  (
  `idRentReceipt` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  `idServiceReceipt` int(11) NOT NULL,
  PRIMARY KEY (`idRentReceipt`, `idRoom`, `idServiceReceipt`) USING BTREE,
  INDEX `idRoom`(`idRoom`) USING BTREE,
  INDEX `idRentReceipt`(`idRentReceipt`) USING BTREE,
  INDEX `idServiceReceipt`(`idServiceReceipt`) USING BTREE,
  CONSTRAINT `rentreceiptdetail_ibfk_1` FOREIGN KEY (`idRentReceipt`) REFERENCES `rentreceipt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rentreceiptdetail_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rentreceiptdetail_ibfk_3` FOREIGN KEY (`idServiceReceipt`) REFERENCES `servicereceipt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rentreceiptdetail
-- ----------------------------
INSERT INTO `rentreceiptdetail` VALUES (1, 1, 1);
INSERT INTO `rentreceiptdetail` VALUES (2, 6, 2);
INSERT INTO `rentreceiptdetail` VALUES (4, 17, 4);
INSERT INTO `rentreceiptdetail` VALUES (3, 22, 3);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idType` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `isDelete` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idType`(`idType`) USING BTREE,
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `roomtype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, 1, 'Room 1', 2, 0);
INSERT INTO `room` VALUES (2, 2, 'Room 2', 2, 0);
INSERT INTO `room` VALUES (3, 3, 'Room 3', 3, 0);
INSERT INTO `room` VALUES (4, 4, 'Room 4', 4, 0);
INSERT INTO `room` VALUES (5, 1, 'Room 5', 2, 0);
INSERT INTO `room` VALUES (6, 2, 'Room 6', 2, 0);
INSERT INTO `room` VALUES (7, 3, 'Room 7', 1, 0);
INSERT INTO `room` VALUES (8, 4, 'Room 8', 1, 0);
INSERT INTO `room` VALUES (9, 1, 'Room 9', 3, 0);
INSERT INTO `room` VALUES (10, 2, 'Room 10', 3, 0);
INSERT INTO `room` VALUES (11, 3, 'Room 11', 2, 0);
INSERT INTO `room` VALUES (12, 4, 'Room 12', 2, 0);
INSERT INTO `room` VALUES (13, 1, 'Room 13', 4, 0);
INSERT INTO `room` VALUES (14, 2, 'Room 14', 4, 0);
INSERT INTO `room` VALUES (15, 3, 'Room 15', 4, 0);
INSERT INTO `room` VALUES (16, 4, 'Room 16', 3, 0);
INSERT INTO `room` VALUES (17, 1, 'Room 17', 2, 0);
INSERT INTO `room` VALUES (18, 2, 'Room 18', 2, 0);
INSERT INTO `room` VALUES (19, 3, 'Room 19', 3, 0);
INSERT INTO `room` VALUES (20, 4, 'Room 20', 4, 0);
INSERT INTO `room` VALUES (21, 1, 'Room 21', 2, 0);
INSERT INTO `room` VALUES (22, 2, 'Room 22', 2, 0);
INSERT INTO `room` VALUES (23, 3, 'Room 23', 1, 0);
INSERT INTO `room` VALUES (24, 4, 'Room 24', 1, 0);
INSERT INTO `room` VALUES (25, 1, 'Room 25', 3, 0);
INSERT INTO `room` VALUES (26, 2, 'Room 26', 3, 0);
INSERT INTO `room` VALUES (27, 3, 'Room 27', 2, 0);
INSERT INTO `room` VALUES (28, 4, 'Room 28', 2, 0);
INSERT INTO `room` VALUES (29, 1, 'Room 29', 4, 0);
INSERT INTO `room` VALUES (30, 2, 'Room 30', 4, 0);
INSERT INTO `room` VALUES (31, 3, 'Room 31', 4, 0);
INSERT INTO `room` VALUES (32, 4, 'Room 32', 3, 0);

-- ----------------------------
-- Table structure for roomtype
-- ----------------------------
DROP TABLE IF EXISTS `roomtype`;
CREATE TABLE `roomtype`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `maxCustomer` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roomtype
-- ----------------------------
INSERT INTO `roomtype` VALUES (1, 'Standard ', 200, 2);
INSERT INTO `roomtype` VALUES (2, 'Superior', 400, 3);
INSERT INTO `roomtype` VALUES (3, 'Deluxe', 600, 3);
INSERT INTO `roomtype` VALUES (4, 'Suite', 800, 3);

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idType` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idType`(`idType`) USING BTREE,
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `servicetype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES (1, 1, 'Snack', 5);
INSERT INTO `service` VALUES (2, 1, 'Noodles', 10);
INSERT INTO `service` VALUES (3, 1, 'Candy', 2);
INSERT INTO `service` VALUES (4, 2, 'Beer', 25);
INSERT INTO `service` VALUES (5, 2, 'Pepsi', 15);
INSERT INTO `service` VALUES (6, 2, 'Sting', 15);

-- ----------------------------
-- Table structure for servicereceipt
-- ----------------------------
DROP TABLE IF EXISTS `servicereceipt`;
CREATE TABLE `servicereceipt`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idService` int(11) NULL DEFAULT NULL,
  `amount` int(11) NULL DEFAULT NULL,
  `total` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idService`(`idService`) USING BTREE,
  CONSTRAINT `servicereceipt_ibfk_1` FOREIGN KEY (`idService`) REFERENCES `service` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicereceipt
-- ----------------------------
INSERT INTO `servicereceipt` VALUES (1, NULL, NULL, 0);
INSERT INTO `servicereceipt` VALUES (2, NULL, NULL, 0);
INSERT INTO `servicereceipt` VALUES (3, NULL, NULL, 0);
INSERT INTO `servicereceipt` VALUES (4, NULL, NULL, 0);

-- ----------------------------
-- Table structure for servicetype
-- ----------------------------
DROP TABLE IF EXISTS `servicetype`;
CREATE TABLE `servicetype`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicetype
-- ----------------------------
INSERT INTO `servicetype` VALUES (1, 'Food');
INSERT INTO `servicetype` VALUES (2, 'Drinks');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` int(11) NULL DEFAULT 1,
  `isDelete` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'lem', '$2y$10$ZSl52XMg.g3e92Xo1RfPWuToGcVuRxh4w6jASHiRjDw5/z36P4reK', 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
