const axios = require('axios')
const cheerio = require('cheerio')
const utils = require('../model/utils')
const conf = require('../config/current')

const dateLocator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td'
const buyLocator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td'
const sellLocator = '#theTable400 > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td > table > tbody > tr > td'

function getURL (year, counter) {
  // https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=400&Idioma=1&FecInicial=2021/01/01&FecFinal=2022/12/31&Filtro=1
  const baseUrl = 'https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx'
  let request = null
  if (counter !== 1) {
    request = baseUrl +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + (year + 1) + '/01/01&Filtro=' + counter
  } else {
    request = baseUrl +
      '?CodCuadro=400&Idioma=1&FecInicial=' + year +
      '/01/01&FecFinal=' + year + '/01/01&Filtro=' + counter
  }
  // assert.equal(request,'https://gee.bccr.fi.cr/indicadoreseconomicos/Cuadros/frmVerCatCuadro.aspx?CodCuadro=400&Idioma=1&FecInicial=2021/01/01&FecFinal=2022/12/31&Filtro=1')
  return request
}

async function main () {
  const year = conf.env.YEAR()
  for (let i = 1; i < 367; i++) {
    const res = await axios.get(getURL(year, i))
    // console.log(res.data)
    const $ = cheerio.load(res.data)
    // console.log($(dateLocator),$(dateLocator).text(),$(buyLocator).text(),$(sellLocator).text())
    let from = utils.getDate($(dateLocator).text().trim())
    // console.log(from)
    if (from !== null && from !== '') {
      from = new Date(from)
      const currency = {
        buy: $(buyLocator).text().trim().replace(/,/g, '.'),
        sell: $(sellLocator).text().trim().replace(/,/g, '.'),
        created_at: from
      }
      console.log(currency)
      await utils.upsertCurrency(currency)
    }
  }
  console.log('Finish updating currency')
  process.exit()
}
main()
