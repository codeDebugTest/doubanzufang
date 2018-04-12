const request = require('request-promise');
const cheerio = require('cheerio');

const homePage = {
    uri: 'https://www.douban.com/group/shanghaizufang/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
}

const CurrentYear = (new Date()).getFullYear();

const getID = (url) => {
    // f.s: https://www.douban.com/people/159176019/
    const splited = url.split('/');
    return splited[splited.length -2];
}
const getTitleInfo = ($, dom) => {
    const url = $(dom).find('a').attr('href');

    return {
        title: $(dom).find('a').attr('title'),
        url: url,
        id: getID(url)
    }
}
const getPublisher = ($, dom) => {
    const url = $(dom).find('a').attr('href')

    return {
        name: $(dom).find('a').text(),
        id: getID(url),
    }
}
const exchangToJsObject = ($, dom) => {
    const  topic = {};
    $(dom).find('td').map(function(i, e) {
        if (i == 0) {
            const titleInfo = getTitleInfo($, this);
            Object.assign(topic, titleInfo);
        } else if (i == 1) {
            topic['publisher'] = getPublisher($, this);
        } else if (i == 2) {
            topic['responseAmount'] = $(this).html();
        } else if (i == 3) {
            topic['lastResponseTime'] = CurrentYear + '-' + $(this).html();
        }
    });
    return topic;
}

const parseHtml = (html) => {
    $ = cheerio.load(html);
    const houseArr = [];
    
    $('table.olt').children().find('tr').map(function(index, el) {
        //去除表头
        if (index == 0) {
            return true;
        }

        houseArr.push(exchangToJsObject($, this));
    })
    return houseArr;
};

request(homePage)
    .then(function(html) {
        const houseList = parseHtml(html);
        console.log(houseList);
    })
    .catch(function(err) {
        console.error(err);
    });

