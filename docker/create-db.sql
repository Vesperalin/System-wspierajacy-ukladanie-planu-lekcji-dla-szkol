-- -----------------------------------------------------
-- Schema school_plan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `school_plan` DEFAULT CHARACTER SET utf8 ;
USE `school_plan` ;

-- -----------------------------------------------------
-- Table `school_plan`.`Subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Subjects` (
  `ID_Subject` INT NOT NULL AUTO_INCREMENT,
  `Subject_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Subject`),
  UNIQUE INDEX `IDSubject_UNIQUE` (`ID_Subject` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Teachers` (
  `ID_Teacher` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Surname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Teacher`),
  UNIQUE INDEX `IDTeacher_UNIQUE` (`ID_Teacher` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Classes` (
  `ID_Class` VARCHAR(10) NOT NULL,
  `Year` INT NOT NULL,
  PRIMARY KEY (`ID_Class`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Classrooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Classrooms` (
  `Classroom_no` INT NOT NULL,
  PRIMARY KEY (`Classroom_no`),
  UNIQUE INDEX `IDClassrooms_UNIQUE` (`Classroom_no` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Lessons` (
  `ID_Lessons` INT NOT NULL AUTO_INCREMENT,
  `FK_Teacher` INT NOT NULL,
  `FK_Subject` INT NOT NULL,
  `FK_Class` INT NOT NULL,
  `FK_Classroom` INT NOT NULL,
  `Weekday` VARCHAR(15) NOT NULL,
  `Hour` INT NOT NULL,
  `Minute` INT NOT NULL,
  PRIMARY KEY (`ID_Lessons`),
  UNIQUE INDEX `IDLessons_UNIQUE` (`ID_Lessons` ASC) VISIBLE,
  INDEX `FK_Teacher_idx` (`FK_Teacher` ASC) VISIBLE,
  INDEX `FK_Subject_idx` (`FK_Subject` ASC) VISIBLE,
  INDEX `FK_Class_idx` (`FK_Class` ASC) VISIBLE,
  INDEX `FK_Classroom_idx` (`FK_Classroom` ASC) VISIBLE,
  CONSTRAINT `FK_Teacher`
    FOREIGN KEY (`FK_Teacher`)
    REFERENCES `school_plan`.`Teachers` (`ID_Teacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Subject2`
    FOREIGN KEY (`FK_Subject`)
    REFERENCES `school_plan`.`Subjects` (`ID_Subject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Class2`
    FOREIGN KEY (`FK_Class`)
    REFERENCES `school_plan`.`Classes` (`ID_Class`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Classroom`
    FOREIGN KEY (`FK_Classroom`)
    REFERENCES `school_plan`.`Classrooms` (`Classroom_no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Lessons_program`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Lessons_program` (
  `FK_Class` VARCHAR(10) NOT NULL,
  `FK_Subject` INT NOT NULL,
  `Hours_no` INT NOT NULL,
  PRIMARY KEY (`FK_Class`, `FK_Subject`),
  INDEX `FK_Subject_idx` (`FK_Subject` ASC) VISIBLE,
  CONSTRAINT `FK_Class`
    FOREIGN KEY (`FK_Class`)
    REFERENCES `school_plan`.`Classes` (`ID_Class`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Subject`
    FOREIGN KEY (`FK_Subject`)
    REFERENCES `school_plan`.`Subjects` (`ID_Subject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_plan`.`Breaks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `school_plan`.`Breaks` (
  `ID_Break` INT NOT NULL AUTO_INCREMENT,
  `Break_no` INT NOT NULL,
  `Start_hour` INT NOT NULL,
  `Start_minute` INT NOT NULL,
  `End_hour` INT NOT NULL,
  `End_minute` INT NOT NULL,
  PRIMARY KEY (`ID_Break`),
  UNIQUE INDEX `IDBreak_UNIQUE` (`ID_Break` ASC) VISIBLE)
ENGINE = InnoDB;

