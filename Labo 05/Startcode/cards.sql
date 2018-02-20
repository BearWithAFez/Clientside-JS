# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.5.5-10.1.10-MariaDB)
# Database: odisee-cs-labo5
# Generation Time: 2017-10-22 21:25:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cards`;

CREATE TABLE `cards` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `quote` text,
  `is_favorite` tinyint(1) NOT NULL DEFAULT '0',
  `motto` text,
  `skills` text,
  `email` varchar(100) DEFAULT NULL,
  `tel` varchar(25) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '0',
  `visual` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;

INSERT INTO `cards` (`id`, `name`, `quote`, `is_favorite`, `motto`, `skills`, `email`, `tel`, `facebook`, `twitter`, `order`, `visual`)
VALUES
	(1,'Kevin Picalausa','Leven ons vraag jonge goa ouder. Schatkist ad aardschok bepaalden producten ik gomboomen.',0,'To be or not to be, this is my awesome motto!','.NET, PHP, Web design, Java','kevin.picalausa@odisee.be','0123 45 67 89','kevin.picalausa','kevinpicalausa',0,'visual1.jpg'),
	(2,'Rogier van der Linde','Sommige schijnt gegoten javanen wij lot opening bronnen kan. Rang heft zake in want ik stad volk.',0,'Weakness on both sides is, as we know, the motto of all quarrels','Javascript, PHP, UX design, HTML5, CSS3','rogier.vanderlinde@odisee.be','0123 45 67 89','rogier.vanderlinde.9','rogiervdl',1,'visual2.jpg'),
	(3,'Joris Maervoet','Overal hoewel aan poeloe bakken sap noemen gas liever zij. Meester vervoer malakka men donkere aan zekeren.',0,'Think before you speak is criticism\'s motto; speak before you think, creation\'s.','Web design, Adobe Photoshop, HTML5, CSS3, Corel and many others...','joris.maervoet@odisee.be','0123 45 67 89','joris.maervoet.9','jorismaervoet',2,'visual3.jpg');

/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pictures
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pictures`;

CREATE TABLE `pictures` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL DEFAULT '',
  `card_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pictures` WRITE;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;

INSERT INTO `pictures` (`id`, `filename`, `card_id`)
VALUES
	(1,'profile1a.jpg',1),
	(2,'profile1b.jpg',1),
	(3,'profile1c.jpg',1),
	(4,'profile2a.jpg',2),
	(5,'profile2b.jpg',2),
	(6,'profile2c.jpg',2),
	(7,'profile2d.jpg',2),
	(8,'profile3a.jpg',3),
	(9,'profile3b.jpg',3);

/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
