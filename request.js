const request = require('request-promise');
const cheerio = require('cheerio');

const homePage = {
    uri: 'https://www.douban.com/group/shanghaizufang/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    }
}

const CurrentYear = (new Date()).getFullYear();

const getTitleInfo = (dom) => {
    const aTag = dom.last();
    return {
        title: aTag.attr('title'),
        url: aTag.attr('href')
    }
}
const getPublisher = (dom) => {
    const aTag = dom.first();
    const uriInfo = aTag.attr('herf').split('/');
    return {
        publisherName: aTag.text(),
        publisherId: uriInfo[uriInfo.length -2]
    }
}
const exchangToJsObject = ($, domObj) => {
    const  house = {};
    $(domObj).find('td').map(function(i, e) {
        if (i == 0) {
            house['title'] = $(this).find('a').attr('title');
            house['url'] = $(this).find('a').attr('href');
        } else if (i == 1) {
            house['publisherName'] = $(this).find('a').text();
            const uriInfo = $(this).find('a').attr('href').split('/');
            house['publisherId'] = uriInfo[uriInfo.length -2];
        } else if (i == 2) {
            house['responseAmount'] = $(this).html();
        } else if (i == 3) {
            house['lastResponseTime'] = CurrentYear + '-' + $(this).html();
        }
    });
    return house;
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

