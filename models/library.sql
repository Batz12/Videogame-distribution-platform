CREATE TABLE IF NOT EXISTS Library(
 L_id  int NOT NULL PRIMARY KEY AUTO_INCREMENT,
 U_id int NOT NULL,
 L_Name varchar(500),
 Game_count int,
 Achievements varchar(25),

 FOREIGN KEY (U_id) REFERENCES Users(U_id) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1;