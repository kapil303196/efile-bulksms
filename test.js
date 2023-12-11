const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const mongoDB = 'mongodb+srv://bulksms:bulksms@cluster0.bmbvy.mongodb.net/BulkSms';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

const testSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', testSchema);

// Test write permission
const testDoc = new Test({ name: 'Test Document' });
testDoc.save()
  .then(doc => {
    console.log('Write successful:', doc);
    // Test read permission
    return Test.findOne({ name: 'Test Document' });
  })
  .then(doc => {
    console.log('Read successful:', doc);
    // Clean up: delete the test document
    return Test.deleteOne({ _id: doc._id });
  })
  .then(() => {
    console.log('Cleanup successful');
    mongoose.connection.close();
  })
  .catch(err => console.error('Operation error:', err));
