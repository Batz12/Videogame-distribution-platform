CREATE DATABASE IF NOT EXISTS Videogames;
USE  Videogames;
CREATE TABLE IF NOT EXISTS Users (
    U_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    S_id int NOT NULL DEFAULT 1,
    Type varchar(15),
    Email varchar(25) NOT NULL,
    Username varchar(25) NOT NULL,
    Password varchar(75) NOT NULL,
    FOREIGN KEY (S_id) REFERENCES Store(S_id) ON DELETE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE Users;
/*const usertab = (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS USER(U_id int AUTO_INCREMENT,UName VARCHAR(35),Type VARCHAR(15),Email VARCHAR(25),Username VARCHAR(25),Password VARCHAR(25),PRIMARY KEY(U_id))';

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User Table created......');

    });
}
ALTER TABLE Users
ALTER S_id SET DEFAULT 1;

module.exports.User = usertab;   
*/