create database proyecto_ing_soft;
use proyecto_ing_soft;
create user 'ferfong'@'localhost' identified by 'Developer123!';
grant all privileges on proyecto_ing_soft.* to 'ferfong';

CREATE TABLE `administradores` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `amigos` (
  `idParticipante1` int(11) NOT NULL,
  `idParticipante2` int(11) NOT NULL,
  PRIMARY KEY (`idParticipante1`,`idParticipante2`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `participantes` (
  `idParticipante` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(500) DEFAULT NULL,
  `username` varchar(500) DEFAULT NULL,
  `profilePicture` longblob DEFAULT NULL,
  PRIMARY KEY (`idParticipante`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `superAdmin` (
  `idSuperAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idSuperAdmin`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `torneos` (
  `idTorneo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `reglas` varchar(500) NOT NULL,
  `consola` varchar(200) NOT NULL,
  `num_participantes` int(11) NOT NULL,
  `juego` varchar(200) NOT NULL,
  `status` varchar(200) DEFAULT NULL,
  `profilePicture` longblob DEFAULT NULL,
  PRIMARY KEY (`idTorneo`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `crea` (
  `idAdministrador` int(11) NOT NULL,
  `idTorneo` int(11) NOT NULL,
  PRIMARY KEY (`idAdministrador`,`idTorneo`),
  KEY `idTorneo` (`idTorneo`),
  CONSTRAINT `crea_ibfk_1` FOREIGN KEY (`idAdministrador`) REFERENCES `administradores` (`idAdministrador`),
  CONSTRAINT `crea_ibfk_2` FOREIGN KEY (`idTorneo`) REFERENCES `torneos` (`idTorneo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `participa` (
  `idParticipante` int(11) NOT NULL,
  `idTorneo` int(11) NOT NULL,
  `statusParticipante` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idParticipante`,`idTorneo`),
  KEY `idTorneo` (`idTorneo`),
  CONSTRAINT `participa_ibfk_1` FOREIGN KEY (`idParticipante`) REFERENCES `participantes` (`idParticipante`),
  CONSTRAINT `participa_ibfk_2` FOREIGN KEY (`idTorneo`) REFERENCES `torneos` (`idTorneo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO superAdmin (idSuperAdmin, nombre, password, email) VALUES (1, 'super', '60b809a4908370f1915546b022d3608d5c8ec232c28aadce36c1b810291e78b0', 'super@gmail.com');

INSERT INTO administradores (idAdministrador, nombre, email, password) VALUES (1, 'admin', 'admin@gmail.com', '60b809a4908370f1915546b022d3608d5c8ec232c28aadce36c1b810291e78b0');



