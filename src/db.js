const MongoClient = require('mongodb').MongoClient;
const DB = require('./config').DB_CONNECT_STR;

const _throwDBError = (action='操作数据库', err) => {
    console.log('------- '+ action + '失败 --------');
    throw 'DB ERROR: ' + err;
};

const _dbCallbackFactory = (action, callback) => {
    return (err, result) => {
        if (err) {
            _throwDBError(action);
        } else {
            callback && callback(result);
        }
    }
}

const insertData = (data, collection) => {
    MongoClient.connect(DB, (err, db) => {
        if (err) {
            _throwDBError('数据库连接');
        } else {
            console.log('------- 数据库连接成功 --------');
            const db_collection = db.collection(collection);
            const _callback = _dbCallbackFactory('插入' + collection + '数据');

            db_collection.insert(data, _callback);
            db.close();
        }
    })
}

const updateData = (condition, action, collection) => {
    MongoClient.connect(DB, (err, db) => {
        if (err) {
            _throwDBError('数据库连接');
        } else {
            console.log('------- 数据库连接成功 --------');
            const db_collection = db.collection(collection);
            const _callback = _dbCallbackFactory('更新' + collection + '数据');

            db_collection.updateMany(condition, action, _callback);
            db.close();
        }
    }) 
}