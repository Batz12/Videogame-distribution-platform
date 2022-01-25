CREATE TABLE IF NOT EXISTS Game(
 G_id  int PRIMARY KEY NOT NULL AUTO_INCREMENT,
 S_id int NOT NULL DEFAULT 1,
 Gname varchar(35),
 Genre varchar(20),
 Publisher varchar(50),
 Discount int,
 Developer varchar(20),
 Rating int,
 Picture varchar(500),
 Requirements varchar(750),
 Price float,
 FOREIGN KEY (S_id) REFERENCES Store(S_id) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;


INSERT INTO Game
VALUES(1,1,'Half Life','FPS','Sierra Studios',30,'Valve',5,
'https://cdn.cloudflare.steamstatic.com/steam/apps/70/capsule_616x353.jpg?t=1591048039','Minimum system requirements:
CPU:
500 mhz processor
RAM:
96mb ram
GPU:
16mb video card
OS:
Windows XP
NET:
Internet Connection
Recommended system requirements:
CPU:
800 mhz processor
RAM:
128mb ram
GPU:
32mb+ video card
OS:
Windows XP
NET:
Internet Connection',10);