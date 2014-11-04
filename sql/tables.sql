CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);