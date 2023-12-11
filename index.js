const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const mongoDB = 'mongodb+srv://bulksms:bulksms@cluster0.bmbvy.mongodb.net/BulkSms';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/collections', (req, res) => {
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      res.status(500).send('Error listing collections');
    } else {
      res.send(collections.map(collection => collection.name));
    }
  });
});

app.get('/', (req, res) => {

    res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});