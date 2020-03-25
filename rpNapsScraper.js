const puppeteer = require('puppeteer')
const $ = require('cheerio')
const url = 'https://www.racingpost.com/tipping/naps-table'

puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url)
        .then(() => page.content())
    )
    .then(html => {
        return $('.tn-napsTable__row', html).map(function () {
            return {
                course: $('.tn-napsTable__crs', this).text(),
                time: $('.tn-napsTable__time', this).text(),
                selection: $('.tn-napsTable__naps', this).text().replace('right', '').trim()
            }
        }).toArray()
    })
    .then(naps => console.log('Naps', naps))
    .then(() => process.exit())
    .catch(err => console.log('Error', err))
