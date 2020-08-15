/*
 Navicat Premium Data Transfer

 Source Server         : MySQLConnection
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : HotelDB

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 16/08/2020 00:32:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Bill
-- ----------------------------
DROP TABLE IF EXISTS `Bill`;
CREATE TABLE `Bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRentReceipt` int DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `roomCharge` int DEFAULT NULL,
  `serviceCharge` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idRentReceipt` (`idRentReceipt`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`idRentReceipt`) REFERENCES `RentReceipt` (`id`),
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Bill
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for BookReceipt
-- ----------------------------
DROP TABLE IF EXISTS `BookReceipt`;
CREATE TABLE `BookReceipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCustomer` int DEFAULT NULL,
  `dateIn` datetime DEFAULT NULL,
  `dateOut` datetime DEFAULT NULL,
  `status` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCustomer` (`idCustomer`),
  CONSTRAINT `bookreceipt_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `Customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of BookReceipt
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for BookReceiptDetail
-- ----------------------------
DROP TABLE IF EXISTS `BookReceiptDetail`;
CREATE TABLE `BookReceiptDetail` (
  `idBookReceipt` int NOT NULL,
  `idRoom` int NOT NULL,
  PRIMARY KEY (`idBookReceipt`,`idRoom`),
  KEY `idRoom` (`idRoom`),
  CONSTRAINT `bookreceiptdetail_ibfk_1` FOREIGN KEY (`idBookReceipt`) REFERENCES `BookReceipt` (`id`),
  CONSTRAINT `bookreceiptdetail_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `Room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of BookReceiptDetail
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Customer
-- ----------------------------
DROP TABLE IF EXISTS `Customer`;
CREATE TABLE `Customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idType` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `idNumber` varchar(15) DEFAULT NULL,
  `isDelete` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idType` (`idType`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `CustomerType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Customer
-- ----------------------------
BEGIN;
INSERT INTO `Customer` VALUES (1, 1, 'Nguyễn Hữu Gia Trí', '0931467534', '261457481', 0);
INSERT INTO `Customer` VALUES (2, 2, 'Huỳnh Thái Anh', '0821457888', '261783812', 0);
INSERT INTO `Customer` VALUES (3, 1, 'Lê Hoài Bảo', '0931532566', '273214222', 0);
INSERT INTO `Customer` VALUES (5, 2, 'Lem Đẹp Trai Vô Cùng', '0944026118', '213212422', 0);
COMMIT;

-- ----------------------------
-- Table structure for CustomerType
-- ----------------------------
DROP TABLE IF EXISTS `CustomerType`;
CREATE TABLE `CustomerType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of CustomerType
-- ----------------------------
BEGIN;
INSERT INTO `CustomerType` VALUES (1, 'Local');
INSERT INTO `CustomerType` VALUES (2, 'Foreign');
COMMIT;

-- ----------------------------
-- Table structure for RentReceipt
-- ----------------------------
DROP TABLE IF EXISTS `RentReceipt`;
CREATE TABLE `RentReceipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCustomer` int DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `dateIn` datetime DEFAULT NULL,
  `dateOut` datetime DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCustomer` (`idCustomer`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `rentreceipt_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `Customer` (`id`),
  CONSTRAINT `rentreceipt_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of RentReceipt
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for RentReceiptDetail
-- ----------------------------
DROP TABLE IF EXISTS `RentReceiptDetail`;
CREATE TABLE `RentReceiptDetail` (
  `idRentReceipt` int NOT NULL,
  `idRoom` int NOT NULL,
  `idServiceReceipt` int NOT NULL,
  PRIMARY KEY (`idRentReceipt`,`idRoom`,`idServiceReceipt`),
  KEY `idRoom` (`idRoom`),
  KEY `idRentReceipt` (`idRentReceipt`),
  KEY `idServiceReceipt` (`idServiceReceipt`),
  CONSTRAINT `rentreceiptdetail_ibfk_1` FOREIGN KEY (`idRentReceipt`) REFERENCES `RentReceipt` (`id`),
  CONSTRAINT `rentreceiptdetail_ibfk_2` FOREIGN KEY (`idRoom`) REFERENCES `Room` (`id`),
  CONSTRAINT `rentreceiptdetail_ibfk_3` FOREIGN KEY (`idServiceReceipt`) REFERENCES `ServiceReceipt` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of RentReceiptDetail
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Room
-- ----------------------------
DROP TABLE IF EXISTS `Room`;
CREATE TABLE `Room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idType` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `isDelete` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idType` (`idType`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `RoomType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Room
-- ----------------------------
BEGIN;
INSERT INTO `Room` VALUES (1, 1, 'Room 1', 1, 0);
INSERT INTO `Room` VALUES (2, 2, 'Room 2', 1, 0);
INSERT INTO `Room` VALUES (3, 3, 'Room 3', 1, 0);
INSERT INTO `Room` VALUES (4, 4, 'Room 4', 1, 0);
INSERT INTO `Room` VALUES (5, 1, 'Room 5', 1, 0);
INSERT INTO `Room` VALUES (6, 2, 'Room 6', 1, 0);
INSERT INTO `Room` VALUES (7, 3, 'Room 7', 1, 0);
INSERT INTO `Room` VALUES (8, 4, 'Room 8', 1, 0);
INSERT INTO `Room` VALUES (9, 1, 'Room 9', 1, 0);
INSERT INTO `Room` VALUES (10, 2, 'Room 10', 1, 0);
INSERT INTO `Room` VALUES (11, 3, 'Room 11', 1, 0);
INSERT INTO `Room` VALUES (12, 4, 'Room 12', 1, 0);
INSERT INTO `Room` VALUES (13, 1, 'Room 13', 1, 0);
INSERT INTO `Room` VALUES (14, 2, 'Room 14', 1, 0);
INSERT INTO `Room` VALUES (15, 3, 'Room 15', 1, 0);
INSERT INTO `Room` VALUES (16, 4, 'Room 16', 1, 0);
INSERT INTO `Room` VALUES (17, 1, 'Room 17', 1, 0);
INSERT INTO `Room` VALUES (18, 2, 'Room 18', 1, 0);
INSERT INTO `Room` VALUES (19, 3, 'Room 19', 1, 0);
INSERT INTO `Room` VALUES (20, 4, 'Room 20', 1, 0);
INSERT INTO `Room` VALUES (21, 1, 'Room 21', 1, 0);
INSERT INTO `Room` VALUES (22, 2, 'Room 22', 1, 0);
INSERT INTO `Room` VALUES (23, 3, 'Room 23', 1, 0);
INSERT INTO `Room` VALUES (24, 4, 'Room 24', 1, 0);
INSERT INTO `Room` VALUES (25, 1, 'Room 25', 1, 0);
INSERT INTO `Room` VALUES (26, 2, 'Room 26', 1, 0);
INSERT INTO `Room` VALUES (27, 3, 'Room 27', 1, 0);
INSERT INTO `Room` VALUES (28, 4, 'Room 28', 1, 0);
INSERT INTO `Room` VALUES (29, 1, 'Room 29', 1, 0);
INSERT INTO `Room` VALUES (30, 2, 'Room 30', 1, 0);
INSERT INTO `Room` VALUES (31, 3, 'Room 31', 1, 0);
INSERT INTO `Room` VALUES (32, 4, 'Room 32', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for RoomType
-- ----------------------------
DROP TABLE IF EXISTS `RoomType`;
CREATE TABLE `RoomType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `maxCustomer` int DEFAULT NULL,
  `priceHour` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of RoomType
-- ----------------------------
BEGIN;
INSERT INTO `RoomType` VALUES (1, 'Standard ', 200, 2, 20);
INSERT INTO `RoomType` VALUES (2, 'Superior', 400, 3, 40);
INSERT INTO `RoomType` VALUES (3, 'Deluxe', 600, 3, 60);
INSERT INTO `RoomType` VALUES (4, 'Suite', 800, 3, 80);
COMMIT;

-- ----------------------------
-- Table structure for Service
-- ----------------------------
DROP TABLE IF EXISTS `Service`;
CREATE TABLE `Service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idType` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idType` (`idType`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `ServiceType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Service
-- ----------------------------
BEGIN;
INSERT INTO `Service` VALUES (1, 1, 'Snack', 5);
INSERT INTO `Service` VALUES (2, 1, 'Noodles', 10);
INSERT INTO `Service` VALUES (3, 1, 'Candy', 2);
INSERT INTO `Service` VALUES (4, 2, 'Beer', 25);
INSERT INTO `Service` VALUES (5, 2, 'Pepsi', 15);
INSERT INTO `Service` VALUES (6, 2, 'Sting', 15);
COMMIT;

-- ----------------------------
-- Table structure for ServiceReceipt
-- ----------------------------
DROP TABLE IF EXISTS `ServiceReceipt`;
CREATE TABLE `ServiceReceipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idService` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idService` (`idService`),
  CONSTRAINT `servicereceipt_ibfk_1` FOREIGN KEY (`idService`) REFERENCES `Service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ServiceReceipt
-- ----------------------------
BEGIN;
INSERT INTO `ServiceReceipt` VALUES (1, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for ServiceType
-- ----------------------------
DROP TABLE IF EXISTS `ServiceType`;
CREATE TABLE `ServiceType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ServiceType
-- ----------------------------
BEGIN;
INSERT INTO `ServiceType` VALUES (1, 'Food');
INSERT INTO `ServiceType` VALUES (2, 'Drinks');
COMMIT;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `permission` int DEFAULT '1',
  `isDelete` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` VALUES (1, 'lem', '$2y$10$ZSl52XMg.g3e92Xo1RfPWuToGcVuRxh4w6jASHiRjDw5/z36P4reK', 1, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
