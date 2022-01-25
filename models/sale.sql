CREATE TABLE IF NOT EXISTS Sale(
 Sale_id  int NOT NULL,
 S_id int NOT NULL,
 Sale_Name varchar(35),
 Group_Discount int,
 Developer_tieup varchar(30),
 PRIMARY KEY (S_id,Sale_id),
 FOREIGN KEY (S_id) REFERENCES Store(S_id) ON DELETE CASCADE
)ENGINE=InnoDB ;


INSERT INTO Sale
VALUES(1,1,'Summer Sale',50,'Valve');

// Trigger for future games when sale is active

DELIMITER $$
CREATE TRIGGER Sale_apply
BEFORE INSERT
ON Game FOR EACH ROW
BEGIN 
    DECLARE sal INT;
    DECLARE checker varchar(50);
    SELECT Group_Discount
    INTO sal
    FROM Sale;
    SELECT Status
    INTO checker
    FROM Store;
    IF checker="Summer Sale" THEN
        SET NEW.Discount=sal;
    END IF;
END $$
DELIMITER ;

DROP TRIGGER Sale_apply;