const schedule = require('node-schedule');
const crawlPage = require('./crawl').crawlPage;

const scheduleRule = new schedule.RecurrenceRule();
// 1, 8~24 每小时整点执行一次
scheduleRule.hour = [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
scheduleRule.minute = 0;
schedule.scheduleJob(scheduleRule, ()=> {
    console.log('定时任务：' + new Date())
})

// crawlPage();