CREATE TABLE IF NOT EXISTS Store(
 S_id  int PRIMARY KEY NOT NULL DEFAULT 1,
 Sname varchar(15),
 Status varchar(15)
)ENGINE=InnoDB ;



INSERT INTO Store
VALUES(1,'Focus','Online');


DROP TABLE Community;
DROP TABLE Reviews;
DROP TABLE Game;
DROP TABLE Comments;
DROP TABLE Library;
DROP TABLE Users;
DROP TABLE Sale;
DROP TABLE Store;
