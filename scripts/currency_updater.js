const request = require('request')
const cheerio = require('cheerio')
const wait = require('wait.for')
const utils = require('../model/utils')
const conf = require('../config/current')
const db = require('../model/db')

const date_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td'
const buy_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td'
const sell_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td'

function getURL (year, counter) {
  const base_url = 'http://indicadoreseconomicos.bccr.fi.cr/' +
    'indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx'
  let request = null
  if (counter != 1) {
    request = base_url +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + (year + 1) + '/01/01&Filtro=' + counter
  } else {
    request = base_url +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + year + '/01/01&Filtro=' + counter
  }
  return request
}

wait.launchFiber(function () {
  const year = conf.env.YEAR()
  for (let i = 366; i > 0; i--) {
    conf.webservice.url = getURL(year, i)
    const res = wait.for(request, conf.webservice)
    const $ = cheerio.load(res.body)
    let from = utils.getDate($(date_locator).text().trim())
    if (from != null && from != '') {
      from = new Date(from)
      const currency = {
        buy: $(buy_locator).text().trim().replace(/,/g, '.'),
        sell: $(sell_locator).text().trim().replace(/,/g, '.'),
        created_at: from
      }
      wait.for(utils.upsertCurrency, currency)
    }
  }
  //  Var res = wait.for(utils.upsertCurrency,currency)
  console.log('Finish updating currency')
  process.exit()
})
