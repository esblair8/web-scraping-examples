const rp = require('request-promise')
const $ = require('cheerio')
const potusParse = require('./potusParser')
const url = 'https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States'

rp(url)
    .then(html => {
        let wikiUrls = []
        let count = 0
        for (let i = 8; i < 53; i++) {
            wikiUrls.push($('b > a', html)[i].attribs.href)
            console.log(i, wikiUrls[count])
            count++
        }
        const potusInfo = wikiUrls.map(url => potusParse('https://en.wikipedia.org' + url))
        return Promise.all(potusInfo)
    })
    .then(presidents => console.log('Presidents', presidents))
    .catch(err => console.log('Error', err))