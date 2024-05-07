-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: auction_site
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `active_auctions`
--

SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `active_auctions` AS SELECT 
 1 AS `id`,
 1 AS `seller_username`,
 1 AS `title`,
 1 AS `description`,
 1 AS `image`,
 1 AS `startdate`,
 1 AS `enddate`,
 1 AS `startbid`,
 1 AS `current_bid`,
 1 AS `remaining_days`,
 1 AS `remaining_hours`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `bids`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE DATABASE 'auction_site';



CREATE TABLE `bids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemid` int DEFAULT NULL,
  `bidderid` int DEFAULT NULL,
  `bidamount` decimal(10,2) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bidderid` (`bidderid`),
  KEY `itemid` (`itemid`),
  CONSTRAINT `bid_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `listings` (`id`),
  CONSTRAINT `bid_ibfk_2` FOREIGN KEY (`bidderid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,1,1,358.00,'2024-02-28 00:00:00',1),(2,4,6,9100.00,'2024-02-28 00:00:00',1),(3,4,5,9200.00,'2024-02-28 00:00:00',1),(4,2,2,4100.00,'2024-02-28 00:00:00',1),(5,3,6,4200.00,'2024-02-28 00:00:00',1),(6,9,2,2200.00,'2024-02-28 00:00:00',0),(7,9,6,2100.00,'2024-02-28 00:00:00',0),(8,8,1,2100.00,'2024-02-28 00:00:00',0),(9,8,6,2200.00,'2024-02-28 00:00:00',0),(10,1,2,400.00,'2024-02-28 00:00:00',1),(12,1,2,401.00,'2024-04-17 11:12:41',1),(13,1,2,10000.00,'2024-04-17 11:13:25',1);
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;

--
-- Table structure for table `listings`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sellerid` int DEFAULT NULL,
  `title` text NOT NULL,
  `description` text,
  `image` text,
  `startdate` date NOT NULL DEFAULT (now()),
  `enddate` datetime NOT NULL DEFAULT ((now() + interval 7 day)),
  `startbid` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sellerid` (`sellerid`),
  CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`sellerid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,1,'Cat Butler (Litterbox included)','Once upon a whimsical whisker-filled time, in the cozy nooks of Purrington Manor, there lived a distinguished feline named Sir Fluffington, the most refined cat butler in all of Kittyshire.','https://i.imgur.com/PrjZG6z.png','2024-04-13','2024-04-25 15:23:00',300.00),(2,1,'Magic Mirror','The Magic mirror from feature film Occulus!','https://i.imgur.com/VyIx658.png','2024-04-13','2024-04-25 15:23:00',4000.00),(3,4,'Real Fairy','A fairy I found in my garden. Might need feeding','https://i.imgur.com/HnPj8vO.png','2024-04-13','2024-04-25 15:23:00',4000.00),(4,4,'Anabelle the Doll','Fairly active doll. Moves without batteries. Might strangle you in your sleep.','https://i.imgur.com/iBnyG3v.png','2024-04-13','2024-04-25 15:23:00',9000.00),(5,4,'Necronomicon','Bound in human skin. Need regular moisturization not to crack. Read at your own risk.','https://i.imgur.com/EtG67zw.jpg','2024-04-13','2024-04-25 15:23:00',9000.00),(6,4,'Ghost in a bottle','Ghost inside a bottle. Spooking and fun decoration for the whole family.','https://i.imgur.com/xEC9HZL.png','2024-04-13','2024-04-25 15:23:00',200.00),(7,4,'Cthulhu Statue','Worship the greatest of the Great Old Ones with this original marble fetish from New Orleans. Has a distinct wet smell at night.\n Never submerge completely in any liquid!\n Size: 25 cm\n Weight: 12 kg \n Great gift for birthdays, baby showers, winter holidays, solstice, or as a graduation gift.','https://i.imgur.com/kt1JY7c.jpg','2024-04-13','2024-04-25 15:23:00',200.00),(8,2,'Lament Configuration','Lament configuration, apparently used as a key? \n I have never used it, I don\'t even know if it works\n ','https://i.imgur.com/cwUJash.png','2024-04-13','2024-04-25 15:23:00',2000.00),(9,2,'Inconspicuous VHS tape','Send this to any friend in dire need of some female company. VHS player not included\n May smell damp.','https://i.imgur.com/azIun9z.png','2024-04-13','2024-04-25 15:23:00',2000.00),(10,10,'Box full of horrors','Whats inside the boxes? Could be anything! Horrors beyond your comprehension! Or maybe a snack, who knows.','https://img.fruugo.com/product/2/78/596815782_max.jpg','2024-04-17','2024-04-17 20:50:38',300.00),(11,10,'Mimic','Feed carefully','https://cdnb.artstation.com/p/assets/covers/images/059/178/337/large/toby-christmas-toby-christmas-thumbnail02.jpg','2024-04-18','2024-04-18 21:00:00',300.00),(12,2,'test','fgf','dfd','2024-04-17','2024-04-24 11:15:29',2.00);
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `joineddate` date NOT NULL DEFAULT (now()),
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','2024-02-27','Admin, 123, Lund','admin@shadowbid.com',10000.00,1),(2,'usifer','123abc','2024-02-27','Usifer Baloba, 123, Lund','abc123@abc.com',499.00,0),(3,'alicesmith','alice123','2024-02-27','456 Oak Ave, Townsville','alice.smith@email.com',7000.00,0),(4,'johndoe','pass123','2024-02-27','123 Main St, Cityville','john.doe@email.com',5000.00,0),(5,'bobjohnson','bob456','2024-02-27','789 Pine Ln, Villagetown','bob.johnson@email.com',6000.00,0),(6,'mikedavis','mike001','2024-02-27','202 Maple Rd, Countryside','mike.davis@email.com',5500.00,0),(7,'sophiemiller','sophie789','2024-02-27','303 Birch Blvd, Suburbia','sophie.miller@email.com',6500.00,0),(8,'alexturner','alex002','2024-02-27','404 Elm Lane, Outskirts','alex.turner@email.com',7500.00,0),(9,'emmawhite','emma456','2024-02-27','505 Oakwood Dr, Riverside','emma.white@email.com',8500.00,0),(10,'blabla','blabla','2024-02-27','test','test',0.00,0),(21,'test','test','2024-04-17','test','test@test',0.00,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Final view structure for view `active_auctions`
--

/*!50001 DROP VIEW IF EXISTS `active_auctions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `active_auctions` AS select `a`.`id` AS `id`,`u`.`username` AS `seller_username`,`a`.`title` AS `title`,`a`.`description` AS `description`,`a`.`image` AS `image`,`a`.`startdate` AS `startdate`,`a`.`enddate` AS `enddate`,`a`.`startbid` AS `startbid`,coalesce(`b`.`max_bidamount`,`a`.`startbid`) AS `current_bid`,timestampdiff(DAY,now(),`a`.`enddate`) AS `remaining_days`,(timestampdiff(HOUR,now(),`a`.`enddate`) % 24) AS `remaining_hours` from ((`listings` `a` join `users` `u` on((`a`.`sellerid` = `u`.`id`))) left join (select `bids`.`itemid` AS `itemid`,max(`bids`.`bidamount`) AS `max_bidamount` from `bids` group by `bids`.`itemid`) `b` on((`a`.`id` = `b`.`itemid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07 16:29:24
