
const DB_CONNECT_STR = 'mongodb://localhost:27017/house_leasing';
const REQ_OPTIONS = {
    uri: 'https://www.douban.com/group/shanghaizufang/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
}


exports.DB_CONNECT_STR = DB_CONNECT_STR;
exports.REQ_OPTIONS = REQ_OPTIONS;