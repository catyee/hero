CREATE TABLE IF NOT EXISTS `GSALES`(
  `GSID`INT UNSIGNED AUTO_INCREMENT,
  `GID` INT NOT NULL ,
  `SID` INT NOT NULL ,
  `SDATE`DATE NOT NULL ,
  `SNUM`INT NOT NULL ,
  PRIMARY KEY (`GSID`)
)ENGINE = InnoDB DEFAULT  CHARSET = utf8;
