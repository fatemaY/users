const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  const database = client.db("inputsDB");
  const collection = database.collection("Users");
  return collection;
}

async function getusers() {
  await client.connect();  // Connect to the database
  const database = client.db("inputsDB");
  const collection = database.collection("Users");
  const users = await collection.find({}).toArray(); // Fetch all users from the collection
  console.log(users);
  return users;
}


async function insertDocument(data) {
  const users = await connectDB();
  const result = await users.insertOne(data);
  return result;
}

async function deleteDocument(id) {
  const haiku = await connectDB();
  const result = await haiku.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function updateDocument(id, data) {
  const users = await connectDB();
  const result = await users.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result;
}

module.exports = {
  insertDocument,
  deleteDocument,
  updateDocument,
  connectDB,
  getusers
};
