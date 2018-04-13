const request = require('request-promise');
const reqOption = require('./config').REQ_OPTIONS;
const parse = require('./htmlParse').parse;
const insertData = require('./db').insertHouse;

const crawlPage = () => {
    request(reqOption)
    .then(html => {
        return parse(html);
    })
    .then(houseList => {
        insertData(houseList);
    })
    .catch(err => {console.error(err)});
}

exports.crawlPage = crawlPage;