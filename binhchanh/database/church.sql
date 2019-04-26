-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `church_donation`

CREATE TABLE `church_donation`
(
 `id`          integer NOT NULL AUTO_INCREMENT ,
 `name`        varchar(45) NOT NULL ,
 `pic`         varchar(45) NOT NULL ,
 `pic_content` varchar(45) NOT NULL ,
 `content`     longtext NOT NULL ,
 `bank_info`   varchar(45) NOT NULL ,
PRIMARY KEY (`id`)
);






-- ************************************** `church_blog`

CREATE TABLE `church_blog`
(
 `id`            integer NOT NULL AUTO_INCREMENT ,
 `name`          varchar(45) NOT NULL ,
 `created_date`  date NOT NULL ,
 `updated_date`  date NOT NULL ,
 `tag_name`      varchar(100) NOT NULL ,
 `type`          varchar(45) NOT NULL ,
 `content`       longtext NOT NULL ,
 `pic_content`   text NOT NULL ,
 `video_content` text NOT NULL ,
 `topic`         varchar(45) NOT NULL ,
PRIMARY KEY (`id`)
);





-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `church_info`

CREATE TABLE `church_info`
(
 `name`        varchar(100) NOT NULL ,
 `history`     longtext NOT NULL ,
 `history_pic` varchar(255) NOT NULL ,
 `longtext`     NOT NULL 

);






-- ************************************** `church_holy_ordering`

CREATE TABLE `church_holy_ordering`
(
 `holy_ordering` int NOT NULL AUTO_INCREMENT ,
PRIMARY KEY (`holy_ordering`)
);





-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;


-- ************************************** `church_page_manager`

CREATE TABLE `church_page_manager`
(
 `id`       int NOT NULL AUTO_INCREMENT ,
 `username` varchar(50) NOT NULL ,
 `password` varchar(50) NOT NULL ,
 `email`    varchar(255) ,
PRIMARY KEY (`id`)
);






-- ************************************** `church_manager`

CREATE TABLE `church_manager`
(
 `id`            int NOT NULL AUTO_INCREMENT ,
 `name`          int ,
 `history`       varchar(255) ,
 `profile_pic`   varchar(255) ,
 `holy_ordering` int NOT NULL ,
PRIMARY KEY (`id`),
KEY `fkIdx_48` (`holy_ordering`),
CONSTRAINT `FK_48` FOREIGN KEY `fkIdx_48` (`holy_ordering`) REFERENCES `church_holy_ordering` (`holy_ordering`)
);





