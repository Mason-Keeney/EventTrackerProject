-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema medtrackdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `medtrackdb` ;

-- -----------------------------------------------------
-- Schema medtrackdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medtrackdb` DEFAULT CHARACTER SET utf8 ;
USE `medtrackdb` ;

-- -----------------------------------------------------
-- Table `medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `medication` ;

CREATE TABLE IF NOT EXISTS `medication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dosage` INT NOT NULL,
  `primary_use` VARCHAR(45) NULL,
  `secondary_use` VARCHAR(45) NULL,
  `use_frequency` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_medication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_medication` ;

CREATE TABLE IF NOT EXISTS `user_medication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medication_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `taken` TINYINT(1) NULL,
  `date` DATE NULL,
  INDEX `fk_medication_has_User_User1_idx` (`user_id` ASC),
  INDEX `fk_medication_has_User_medication_idx` (`medication_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_medication_has_User_medication`
    FOREIGN KEY (`medication_id`)
    REFERENCES `medication` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_medication_has_User_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS meduser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'meduser' IDENTIFIED BY 'meduser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'meduser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `medication`
-- -----------------------------------------------------
START TRANSACTION;
USE `medtrackdb`;
INSERT INTO `medication` (`id`, `name`, `dosage`, `primary_use`, `secondary_use`, `use_frequency`) VALUES (1, 'Spironolactone', 50, 'Blood Pressure', '', 'Once Daily');
INSERT INTO `medication` (`id`, `name`, `dosage`, `primary_use`, `secondary_use`, `use_frequency`) VALUES (2, 'Acetaminophen', 325, 'Pain Management', NULL, 'As Needed');
INSERT INTO `medication` (`id`, `name`, `dosage`, `primary_use`, `secondary_use`, `use_frequency`) VALUES (3, 'Ibuprofen', 1200, 'Pain, Fever, Inflatmation', NULL, 'As Needed');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `medtrackdb`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`) VALUES (1, 'Caitlyn', 'Mae', 'caitlyn_mae', 'password');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_medication`
-- -----------------------------------------------------
START TRANSACTION;
USE `medtrackdb`;
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (1, 1, 1, 1, '2021-07-03');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (2, 2, 1, 1, '2021-07-03');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (3, 1, 1, 1, '2021-07-04');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (4, 2, 1, 1, '2021-07-04');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (5, 1, 1, 1, '2021-07-05');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (6, 2, 1, 1, '2021-07-05');
INSERT INTO `user_medication` (`id`, `medication_id`, `user_id`, `taken`, `date`) VALUES (7, 3, 1, 1, '2021-07-05');

COMMIT;

