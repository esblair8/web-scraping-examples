const rp = require('request-promise')
const $ = require('cheerio')

module.exports = url => {
    return rp(url)
        .then(function (html) {
            return {
                name: $('#firstHeading', html).text(),
                birthday: $('.bday', html).text(),
            }
        })
        .catch(function (err) {
            console.log('Error', err)
        })
}