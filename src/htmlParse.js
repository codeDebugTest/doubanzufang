const cheerio = require('cheerio');

const CurrentYear = (new Date()).getFullYear();

const getID = (url) => {
    // e.g: https://www.douban.com/people/159176019/
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

const parse = (html) => {
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

exports.parse = parse;