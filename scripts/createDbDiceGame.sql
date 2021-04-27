-- Primer paso: Ejecutar este script en tu base de datos: 

CREATE DATABASE IF NOT EXISTS `dicegame` DEFAULT CHARACTER SET utf8mb4 ;

USE `dicegame`;

CREATE TABLE IF NOT EXISTS `dicegame`.`player` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL UNIQUE DEFAULT 'ANONIMO',
    `date` TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS `dicegame`.`game` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `result` ENUM('WIN', 'LOSE') NOT NULL,
    `dice_one` INT NOT NULL ,
    `dice_two` INT NOT NULL ,
    `player_id` INT UNSIGNED,
    FOREIGN KEY (`player_id`) REFERENCES `dicegame`.`player`(`id`)
);