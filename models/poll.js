const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectID;

module.exports = class Poll {
    constructor(title, question, description, options) {
        this.title = title;
        this.question = question;
        this.description = description;
        this.options = options;

        this.votes = new Array(options.length);
        this.votes.fill(0);
    }

    save() {
        const db = getDb();
        return db.collection('polls').insertOne(this);
    }

    static getPollById(pollId) {
        const db = getDb();
        return db.collection('polls').find({_id: new ObjectId(pollId)}).next();
    }

    static postVote(pollId, option) {
        const db = getDb();

        const query = {};
        query[`votes.${option}`] = 1;
        
        return db.collection('polls').updateOne({_id: new ObjectId(pollId)}, {$inc : query});
    }
}