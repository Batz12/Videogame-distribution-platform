CREATE TABLE IF NOT EXISTS Reviews(
 R_id  int NOT NULL AUTO_INCREMENT,
 U_id int NOT NULL,
 G_id int NOT NULL,
 RName varchar(250),
 Publication varchar(25),
 Rating int,
 Review_feedback_rating int,
 PRIMARY KEY (R_id,U_id,G_id),
 FOREIGN KEY (U_id) REFERENCES Users(U_id) ON DELETE CASCADE,
 FOREIGN KEY (G_id) REFERENCES Game(G_id) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;

DESC Store;
DESC Sale;
DESC Users;
DESC Library;
DESC Comments;
DESC Reviews;
DESC Game;
DESC Community;

INSERT INTO Reviews
VALUES(1,4,1,'Hello','aneesh',5,0);
INSERT INTO Reviews
VALUES(2,4,7,'Best FPS of all time!','aneesh',5,0);
INSERT INTO Reviews
VALUES(3,5,8,'Best platformer','john',4,0);




DELIMITER $$

CREATE PROCEDURE Rating_update()
BEGIN
UPDATE Game AS G SET Rating = (SELECT AVG(R.Rating) 
FROM Reviews As R 
WHERE R.G_id=G.G_id 
GROUP BY R.G_id);
END$$

DELIMITER ;

 

CALL Rating_update();


drop procedure Rating_update;



SELECT AVG(R.Rating) , G.G_id FROM Reviews AS R, Game AS G WHERE R.G_id=G.G_id Group By R.G_id;

UPDATE Game AS G SET Rating = (SELECT AVG(R.Rating) FROM Reviews As R WHERE R.G_id=G.G_id GROUP BY R.G_id);


