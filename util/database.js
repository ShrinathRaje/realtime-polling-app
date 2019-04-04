const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://polling-app:UQxOkRV0vlHFKFJa@realtime-polling-app-9rxqo.mongodb.net/poll?retryWrites=true', {useNewUrlParser: true}).then(client => {
        _db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if(_db)
        return _db;
    else
        throw 'No Databse found';
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;