CREATE TABLE "to-do-table" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL,
    "description" VARCHAR (300) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
    "dateCreated" DATE
);
INSERT INTO "to-do-table" 
	("name", "description", "dateCreated") 
VALUES 
	('Grocery Store', 'Grab bananas, tomatoes, and milk', '2022-07-01')