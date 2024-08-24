const { insertDocument, deleteDocument, updateDocument,connectDB, getusers } = require('../models/haikuModel');

async function insertHaiku(req, res) {
  try {
    const data = req.body;
    const result = await insertDocument(data);
    res.status(200).send(`Document inserted with ID: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting document');
  }
}

async function getHaiku(req, res) {
  try {
    const users = await getusers(); // Await the result of the asynchronous operation
    console.log(users);
    res.status(200).json(users); // Send all users as a JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function deleteHaiku(req, res) {
  try {
    const id = req.params.id;
    console.log(`Deleting document with ID: ${id}`);
    const result = await deleteDocument(id);
    if (result.deletedCount === 1) {
      res.status(200).send(`Document with ID: ${id} deleted successfully`);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting document');
  }
}

async function updateHaiku(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateDocument(id, data);
    if (result.matchedCount === 1) {
      res.status(200).send(`Document with ID: ${id} updated successfully`);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating document');
  }
}

module.exports = {
  insertHaiku,
  deleteHaiku,
  updateHaiku,
  getHaiku
};
