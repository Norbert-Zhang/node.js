const MongoClient = require('mongodb').MongoClient;
// Create the connection url/string
const url = 'mongodb://admin:123456@localhost:27097';
// DB Name
const dbName = 'itying';
// Create the MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
// Connect the specific DB
client.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connection is ok...");
    let db = client.db(dbName);
    // // 1. find the data
    // db.collection('user').find({ "age": 26 }).toArray((err, data) => {
    //     console.log(data);
    //     // Must be closed, after the operation
    //     client.close();
    // });
    // // 2. add the data
    // db.collection('user').insertOne({ "username": "user6", "age": 38 }, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log('add is ok...');
    //     console.log(result.insertedId);
    //     // Must be closed, after the operation
    //     client.close();
    // });
    // // 3. change the data
    // db.collection('user').updateOne({ "age": 38 }, { $set: { "username": "user7" } }, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log('change is ok...');
    //     //console.log(result);
    //     // Must be closed, after the operation
    //     client.close();
    // });
    // 4. delete the data
    db.collection('user').deleteOne({ "username": "user7" }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('delete is ok...');
        //console.log(result);
        // Must be closed, after the operation
        client.close();
    });


});