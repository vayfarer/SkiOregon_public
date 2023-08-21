-- Michael Chen and Christian Kesting
-- CS 340, Project Step 6
-- SkiOregon
-- Data Definition List and example inserts.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLES IF EXISTS Resorts, Runs, Customers, Transactions, Passes;

-- -----------------------------------------------------
-- Table `Resorts`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Resorts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) UNIQUE NOT NULL,
  `vert` INT NULL,
  `avg_snowpack` INT NULL,
  `rate` DECIMAL(19,2) NOT NULL,
  PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `Runs`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Runs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Resorts_id` INT NOT NULL,
  `name` VARCHAR(145) NOT NULL,
  `difficulty` VARCHAR(45) NULL,
  `length` INT NULL,
  `vert` INT NULL,
  `groomed` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`Resorts_id`)
  REFERENCES `Resorts` (`id`)
	ON DELETE CASCADE
 );


-- -----------------------------------------------------
-- Table `Customers`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(145) NOT NULL,
  PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `Transactions`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Customers_id` INT,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`Customers_id`)
  REFERENCES `Customers` (`id`)
	ON DELETE SET NULL
);


-- -----------------------------------------------------
-- Table `Passes`
-- -----------------------------------------------------
CREATE OR REPLACE TABLE `Passes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Transactions_id` INT NOT NULL,
  `Resorts_id` INT,
  `quantity` INT NOT NULL,
  `available` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Passes_Resorts1_idx` (`Resorts_id` ASC) VISIBLE,
  INDEX `fk_Passes_Transactions1_idx` (`Transactions_id` ASC) VISIBLE,
	FOREIGN KEY (`Resorts_id`)
	REFERENCES `Resorts` (`id`)
	ON DELETE SET NULL,
	FOREIGN KEY (`Transactions_id`)
	REFERENCES `Transactions` (`id`)
	ON DELETE CASCADE
);

-- -----------------------------------------------------
-- INSERT INTO Resorts, Runs, Customers, Transactions, Passes 
-- -----------------------------------------------------

INSERT INTO Resorts (name, vert, avg_snowpack, rate)
VALUES
('Timberline', 3691, 300, 135.00),
('Mt. Bachelor', 3366, 280, 195.00),
('HooDoo', 1017, 210, 79.00),
('Mt. Ashland', 1161, 180, 69.00);

INSERT INTO Runs (Resorts_id, name, difficulty, length, vert, groomed)
VALUES
(1, 'Magic Mile', 'Intermediate', 5280, NULL, 1),
(2, 'The Cirque', 'Expert', 2100, 880, 0),
(3, 'Grandstand', 'Advanced', 1850, 560, 0),
(4, 'Romeo', 'Intermediate', 3200, 680, 1);

INSERT INTO Customers (fname, lname, age, phone, email)
VALUES
('Chris', 'K', 40, '555-123-4567', 'chrisk@chris.com'),
('Mike', 'C', 30, '555-123-4568', 'mike@mike.com'),
('Three', 'Cust', 3, '555-123-3333', 'three@3.com'),
('Four', 'Cust', 4, '555-123-4444', 'four@3.com');

INSERT INTO Transactions (Customers_id, date)
VALUES
((SELECT id FROM Customers WHERE fname = 'Chris' and lname = 'K'), "2022-11-02"),
((SELECT id FROM Customers WHERE fname = 'Chris' and lname = 'K'), "2023-01-07"),
((SELECT id FROM Customers WHERE fname = 'Mike' and lname = 'C'), "2023-02-12"),
((SELECT id FROM Customers WHERE fname = 'Three' and lname = 'Cust'), "2023-04-07");

INSERT INTO Passes (Resorts_id, Transactions_id, quantity, available)
VALUES
(1, 2, 1, 1),
(3, 1, 2, 0),
(3, 3, 3, 4),
(3, 4, 4, 0),
(4, 4, 5, 1);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;


