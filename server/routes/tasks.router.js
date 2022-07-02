const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('in router.get');
  let queryText = 'SELECT * FROM "to-do-table" ORDER BY "dateCreated";';
  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting todo list', error);
      res.sendStatus(500);
    });
});

//router POST
router.post('/', (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "to-do-table" ("name", "description", "dateCreated")
                   VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [newTask.name, newTask.description, newTask.dateCreated])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

//router PUT
router.put('/:id', (req, res) => {
  console.log('start of router.put');
  let queryText = 'UPDATE "to-do-table" SET "completed" = $1 WHERE id = $2;';
  let values = [req.body.completed, req.params.id];
  pool
    .query(queryText, values)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(`Error UPDATEing with query ${queryText}: ${error}`);
      res.sendStatus(500);
    });
});

//router DELETE
module.exports = router;