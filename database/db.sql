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

 Date: 13/07/2020 23:01:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `idbillrent` int(255) NOT NULL,
  `sumprice` int(255) NULL DEFAULT NULL,
  `dateout` datetime(6) NULL DEFAULT NULL,
  `iduser` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idbillrent`) USING BTREE,
  INDEX `iduser`(`iduser`) USING BTREE,
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`idbillrent`) REFERENCES `billrent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for billbook
-- ----------------------------
DROP TABLE IF EXISTS `billbook`;
CREATE TABLE `billbook`  (
  `id` int(255) NOT NULL,
  `idcustomer` int(255) NULL DEFAULT NULL,
  `datein` date NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idcustomer`(`idcustomer`) USING BTREE,
  CONSTRAINT `billbook_ibfk_1` FOREIGN KEY (`id`) REFERENCES `detailsbook` (`idbillbook`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `billbook_ibfk_2` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for billrent
-- ----------------------------
DROP TABLE IF EXISTS `billrent`;
CREATE TABLE `billrent`  (
  `id` int(255) NOT NULL,
  `idcustomer` int(255) NULL DEFAULT NULL,
  `datein` datetime(6) NULL DEFAULT NULL,
  `dateout` datetime(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idcustomer`(`idcustomer`) USING BTREE,
  CONSTRAINT `billrent_ibfk_2` FOREIGN KEY (`id`) REFERENCES `detailsrent` (`idbillrent`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `billrent_ibfk_3` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for billservice
-- ----------------------------
DROP TABLE IF EXISTS `billservice`;
CREATE TABLE `billservice`  (
  `id` int(255) NOT NULL,
  `idservice` int(255) NULL DEFAULT NULL,
  `count` int(255) NULL DEFAULT NULL,
  `sumprice` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idbillrent`(`id`, `idservice`) USING BTREE,
  INDEX `idservice`(`idservice`) USING BTREE,
  CONSTRAINT `billservice_ibfk_1` FOREIGN KEY (`idservice`) REFERENCES `service` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(255) NOT NULL,
  `cmnd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` int(255) NULL DEFAULT NULL,
  `idtype` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idtype`(`idtype`) USING BTREE,
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idtype`) REFERENCES `customertype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, '385746369', 'ABC', 96636362, 1);
INSERT INTO `customer` VALUES (2, '123456789', 'BCA', 94463001, 2);

-- ----------------------------
-- Table structure for customertype
-- ----------------------------
DROP TABLE IF EXISTS `customertype`;
CREATE TABLE `customertype`  (
  `id` int(255) NOT NULL,
  `nametype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customertype
-- ----------------------------
INSERT INTO `customertype` VALUES (1, 'Việt Nam');
INSERT INTO `customertype` VALUES (2, 'Nước Ngoài');

-- ----------------------------
-- Table structure for detailsbook
-- ----------------------------
DROP TABLE IF EXISTS `detailsbook`;
CREATE TABLE `detailsbook`  (
  `idbillbook` int(255) NOT NULL,
  `idroom` int(255) NULL DEFAULT NULL,
  INDEX `idbillbook`(`idbillbook`) USING BTREE,
  INDEX `idroom`(`idroom`) USING BTREE,
  CONSTRAINT `detailsbook_ibfk_1` FOREIGN KEY (`idroom`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for detailsrent
-- ----------------------------
DROP TABLE IF EXISTS `detailsrent`;
CREATE TABLE `detailsrent`  (
  `idbillrent` int(255) NOT NULL,
  `idroom` int(255) NULL DEFAULT NULL,
  `idbillservice` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idbillrent`) USING BTREE,
  INDEX `idroom`(`idroom`) USING BTREE,
  INDEX `idbillservice`(`idbillservice`, `idbillrent`) USING BTREE,
  CONSTRAINT `detailsrent_ibfk_1` FOREIGN KEY (`idroom`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detailsrent_ibfk_2` FOREIGN KEY (`idbillservice`) REFERENCES `billservice` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` int(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `typeid` int(255) NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `typeid`(`typeid`) USING BTREE,
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`typeid`) REFERENCES `roomtype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, 'Phòng 1', 1, 0);
INSERT INTO `room` VALUES (2, 'Phòng 2', 1, 0);
INSERT INTO `room` VALUES (3, 'Phòng 3', 1, 0);
INSERT INTO `room` VALUES (4, 'Phòng 4', 1, 0);
INSERT INTO `room` VALUES (5, 'Phòng 5', 1, 0);
INSERT INTO `room` VALUES (6, 'Phòng 6', 2, 0);
INSERT INTO `room` VALUES (7, 'Phòng 7', 2, 0);
INSERT INTO `room` VALUES (8, 'Phòng 8', 3, 0);
INSERT INTO `room` VALUES (9, 'Phòng 9 ', 3, 0);
INSERT INTO `room` VALUES (10, 'Phòng 10', 4, 0);
INSERT INTO `room` VALUES (11, 'Phòng 11', 5, 0);

-- ----------------------------
-- Table structure for roomtype
-- ----------------------------
DROP TABLE IF EXISTS `roomtype`;
CREATE TABLE `roomtype`  (
  `id` int(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int(255) NULL DEFAULT NULL,
  `max_persons` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roomtype
-- ----------------------------
INSERT INTO `roomtype` VALUES (1, 'Phòng tiêu chuẩn ', 200, 2);
INSERT INTO `roomtype` VALUES (2, 'Phòng vip 1', 400, 2);
INSERT INTO `roomtype` VALUES (3, 'Phòng vip 2', 500, 3);
INSERT INTO `roomtype` VALUES (4, 'Phòng vip 3', 800, 3);
INSERT INTO `roomtype` VALUES (5, 'Phòng VIP', 1000, 3);

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `id` int(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `idtype` int(255) NULL DEFAULT NULL,
  `price` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idtype`(`idtype`) USING BTREE,
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`idtype`) REFERENCES `servicetype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES (1, 'Nước suối', 1, 7000);
INSERT INTO `service` VALUES (2, 'Nước ngọt', 1, 15000);
INSERT INTO `service` VALUES (3, 'Bia', 1, 20000);
INSERT INTO `service` VALUES (4, 'Snack', 2, 8000);
INSERT INTO `service` VALUES (5, 'Cơm', 2, 30000);
INSERT INTO `service` VALUES (6, 'Phở', 2, 50000);

-- ----------------------------
-- Table structure for servicetype
-- ----------------------------
DROP TABLE IF EXISTS `servicetype`;
CREATE TABLE `servicetype`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicetype
-- ----------------------------
INSERT INTO `servicetype` VALUES (1, 'Thức uống');
INSERT INTO `servicetype` VALUES (2, 'Thức ăn');
INSERT INTO `servicetype` VALUES (3, 'Đồ tiêu dùng');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'thaianhhd', '123123', 0);
INSERT INTO `user` VALUES (2, 'lemlem', 'lemdeptrai', 1);
INSERT INTO `user` VALUES (3, 'baobede', '123123', 1);
INSERT INTO `user` VALUES (4, 'thaianhvip', '123123', 0);
INSERT INTO `user` VALUES (5, 'vipsaxpro', '123123', 0);

SET FOREIGN_KEY_CHECKS = 1;
