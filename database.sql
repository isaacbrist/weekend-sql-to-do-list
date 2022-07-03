CREATE TABLE "to-do-table" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL,
    "description" VARCHAR (300) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
);
INSERT INTO "to-do-table" 
	("name", "description",) 
VALUES 
	("Grocery Store", "Grab bananas, tomatoes, and milk")
("Dog Food"	"Get dog food")	
("Dog Bath"	"Give the dogs a bath")
("Vacuum"	"Vacuum living room")