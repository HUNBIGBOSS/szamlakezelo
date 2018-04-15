-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: szamlakezelo
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `felhasznalok`
--

DROP TABLE IF EXISTS `felhasznalok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `felhasznalok` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `veznev` varchar(50) DEFAULT NULL,
  `kernev` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `felhasznalok`
--

LOCK TABLES `felhasznalok` WRITE;
/*!40000 ALTER TABLE `felhasznalok` DISABLE KEYS */;
INSERT INTO `felhasznalok` VALUES (1,'szevike_@valami.hu','szevike','nincs','Király','Szeverin'),(2,'n@n.com','a','a',NULL,NULL),(3,'pelda@nincs.hu','nincs','nincs',NULL,NULL),(4,'valami@nincs.net','b','b','Teszt','Elek');
/*!40000 ALTER TABLE `felhasznalok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szamlak`
--

DROP TABLE IF EXISTS `szamlak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `szamlak` (
  `szamla_id` int(11) NOT NULL AUTO_INCREMENT,
  `sorszam` varchar(10) NOT NULL,
  `szamla_nev` varchar(30) NOT NULL,
  `kelte` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `szallito_nev` varchar(50) NOT NULL,
  `szallito_cim` varchar(100) NOT NULL,
  `szallito_adoszam` int(11) NOT NULL,
  `szallito_szamlaszam` int(11) NOT NULL,
  `vevo_nev` varchar(50) NOT NULL,
  `vevo_cim` varchar(100) NOT NULL,
  `vevo_adoszam` int(11) NOT NULL,
  `vevo_szamlaszam` int(11) NOT NULL,
  `fiz_mod` varchar(30) NOT NULL,
  `telj_datum` date DEFAULT NULL,
  `kelte_datum` date DEFAULT NULL,
  `esedekesseg` date DEFAULT NULL,
  `megnevezes` varchar(50) NOT NULL,
  `mennyiseg` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `afa` int(11) NOT NULL,
  `afaertek` int(11) NOT NULL,
  `brutto` int(11) NOT NULL,
  PRIMARY KEY (`szamla_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szamlak`
--

LOCK TABLES `szamlak` WRITE;
/*!40000 ALTER TABLE `szamlak` DISABLE KEYS */;
INSERT INTO `szamlak` VALUES (1,'123','Számla 1','2018-02-10 21:17:22','a','a',1,1,'a','a',1,1,'atutalas','2018-03-29','2018-03-27','2018-04-09','1',1,1,1,1,1),(2,'124','Számla 2','2018-03-12 17:20:44','a','a',1,1,'a','a',11,1,'atutalas','2018-03-30','2018-04-04','2018-04-10','b',2,2,2,2,2),(3,'1314','afg','2018-04-15 13:40:52','Balek','Eleks',1414,4646,'3rwef','35q3tq3',33,35353,'keszpenz','2018-03-29','2018-04-02','2018-04-17','aawf',1,1,1,1,1);
/*!40000 ALTER TABLE `szamlak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_szamla_kapcs`
--

DROP TABLE IF EXISTS `user_szamla_kapcs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_szamla_kapcs` (
  `user_id` int(11) NOT NULL,
  `szamla_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`,`szamla_id`),
  KEY `szamla_id` (`szamla_id`),
  CONSTRAINT `user_szamla_kapcs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `felhasznalok` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_szamla_kapcs_ibfk_2` FOREIGN KEY (`szamla_id`) REFERENCES `szamlak` (`szamla_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_szamla_kapcs`
--

LOCK TABLES `user_szamla_kapcs` WRITE;
/*!40000 ALTER TABLE `user_szamla_kapcs` DISABLE KEYS */;
INSERT INTO `user_szamla_kapcs` VALUES (1,1),(1,2),(4,3);
/*!40000 ALTER TABLE `user_szamla_kapcs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-15 18:33:06
