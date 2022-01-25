CREATE TABLE IF NOT EXISTS Comments(
 C_id  int NOT NULL AUTO_INCREMENT,
 U_id int NOT NULL,
 CName varchar(25),
 Likes int,
 Dislikes int,
 Replies varchar(25),
 PRIMARY KEY(C_id,U_id),
 FOREIGN KEY (U_id) REFERENCES Users(U_id) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 ;

INSERT INTO Comments
VALUES(1,4,'aneesh',5,0,'Hello');
INSERT INTO Comments
VALUES(2,4,'aneesh',3,0,'Best FPS of all time!');
INSERT INTO Comments
VALUES(3,5,'john',1,0,'Best platformer');



INSERT INTO Community
VALUES(1,'https://cdn.cloudflare.steamstatic.com/steam/apps/70/capsule_616x353.jpg?t=1591048039',1,4,1);
INSERT INTO Community
VALUES(2,'https://upload.wikimedia.org/wikipedia/en/2/25/Half-Life_2_cover.jpg',7,4,2);
INSERT INTO Community
VALUES(3,'https://upload.wikimedia.org/wikipedia/en/d/d2/Sonic_Mania_%28artwork%29.jpg',8,5,3);


