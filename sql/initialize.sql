DROP TABLE IF EXISTS users, players;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50),
    PRIMARY KEY (id));

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE);

INSERT INTO users
(username, password, email)
VALUES
("JackTheMack88", "football", "jackfootball@test.com"),
("StanTheMan77", "winner", "stansemail@test.com"),
("FrankTheTank98", "password", "frankiej@test.com");

INSERT INTO players
(first_name, last_name, user_id)
VALUES
("Tom", "Brady", 3),
("Lamar", "Jackson", 1),
("Jonathan", "Taylor", 2),
("Derrick", "Henry", 1),
("Tyler", "Higbee", 2),
("Adam", "Thielen", 1),
("Zach", "Ertz", 3);