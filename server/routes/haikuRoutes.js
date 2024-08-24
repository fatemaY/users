const express = require('express');
const { insertHaiku, deleteHaiku, updateHaiku, getHaiku } = require('../controllers/haikuController');
//var haikuecontr = require('../controllers/haikuController');

const router = express.Router();

router.get('/', getHaiku); // localhost:3000/haiku/get/:id

// POST route to handle data insertion
router.post('/insert', insertHaiku);  // localhost:3000/haiku/insert

// DELETE route to handle data deletion
router.delete('/delete/:id', deleteHaiku); //localhost:3000/haiku/delete/:id

// PUT route to handle data update
router.put('/update/:id', updateHaiku);//localhost:3000/haiku/update/:id

module.exports = router;
