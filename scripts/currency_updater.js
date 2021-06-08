const axios = require('axios')
const cheerio = require('cheerio')
const utils = require('../model/utils')
const conf = require('../config/current')
const db = require('../model/db')

const date_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td'
const buy_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td'
const sell_locator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td'

function getURL (year, counter) {
  // https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=400&Idioma=1&FecInicial=2021/01/01&FecFinal=2022/12/31&Filtro=1
  const base_url = 'https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?'
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
  assert.equal(request,'https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=400&Idioma=1&FecInicial=2021/01/01&FecFinal=2022/12/31&Filtro=1')
  return request
}

async function main() {
  const year = conf.env.YEAR()
  for (let i = 1; i < 367; i++) {
    const res = await axios.get(getURL(year, i))
    console.log(res)
    const $ = cheerio.load(res.data)
    console.log($(date_locator),$(date_locator).text(),$(buy_locator).text(),$(sell_locator).text())
    let from = utils.getDate($(date_locator).text().trim())
    console.log(from)
    if (from != null && from != '') {
      from = new Date(from)
      const currency = {
        buy: $(buy_locator).text().trim().replace(/,/g, '.'),
        sell: $(sell_locator).text().trim().replace(/,/g, '.'),
        created_at: from
      }
      console.log(currency)
      //await utils.upsertCurrency(currency)
    }
    break;
  }
  console.log('Finish updating currency')
  process.exit()
}
main();
