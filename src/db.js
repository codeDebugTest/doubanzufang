const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DB_URL = require('./config').DB_CONNECT_STR;
const DB_NAME = 'house_leasing';

const _throwDBError = (action='操作数据库', err) => {
    console.log('------- '+ action + '失败 --------');
    throw 'DB ERROR: ' + err;
};

const _dbCallbackFactory = (action, callback) => {
    return (err, result) => {
        assert.equal(err, null);
        console.log(action + ' successful.');
        callback && callback(result);
    }
}

const insertHouse = (data) => {
    MongoClient.connect(DB_URL, (err, client) => {
        assert.equal(null, err);
        console.log('------- connected db successfully. --------');

        const db = client.db(DB_NAME);
        const collection = db.collection("house_topic");
        collection.insertMany(data, (err, result) => {
            assert.equal(null, err);
            assert.equal(data.length, result.result.n);
            assert.equal(data.length, result.ops.length);
            console.log("-------- insert data successfully. ----------");
            client.close();
        });
    })
}

const selectAllHouse = () => {
    MongoClient.connect(DB_URL, (err,client) => {
        assert.equal(null, err);
        console.log('------- connected db successfully. --------');
        const db = client.db(DB_NAME);
        const collection = db.collection("house_topic");
        collection.find({}).toArray((err, houseList) => {
            assert(err, null);
            console.log('------- found following records --------');
            console.log(houseLIst);
        })
    })
}  



exports.insertHouse = insertHouse;