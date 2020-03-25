const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://www.reddit.com'

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url)
        .then(() => page.content())
    )
    .then(html => {
        $('h3', html).each(function() {
            console.log($(this).text())
          })
    })
    .then(() => process.exit())
    .catch(err => console.log('Error', err))