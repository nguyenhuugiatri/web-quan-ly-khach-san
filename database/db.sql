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

 Date: 13/07/2020 22:46:28
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
-- Table structure for customertype
-- ----------------------------
DROP TABLE IF EXISTS `customertype`;
CREATE TABLE `customertype`  (
  `id` int(255) NOT NULL,
  `nametype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
-- Table structure for servicetype
-- ----------------------------
DROP TABLE IF EXISTS `servicetype`;
CREATE TABLE `servicetype`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
