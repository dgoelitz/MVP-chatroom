const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dgoelitz:FueRie12@catchatcluster.twvwy.mongodb.net/chat?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 1});

module.exports = (user, message) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
  client.connect(err => {
    const collection = client.db("chat").collection("log");
    collection.insertOne({ user: user, message: message, date: Date() }, ((err, result) => {
      if (err) throw err;
      client.close();
    }));
  });
}