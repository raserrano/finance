const axios = require('axios')
const cheerio = require('cheerio')
const config = require('../config/current')
const Metal = require('../model/metals')

async function saveMetal (body, type) {
  const $ = cheerio.load(body)

  const metal = {
    price: $('.dailyPrice').text().trim().replace(/,/g, ''),
    type: 'Troy Ounce',
    metal: type
  }
  // Price converted from cents to dollar
  if (metal.metal === 'silver') {
    metal.price = (metal.price / 100)
  }
  // Price per metric ton converted to price per troy ounce
  if (metal.metal === 'aluminum' || metal.metal === 'copper') {
    metal.price = (metal.price / 32150.7)
  }
  // Price per gallon converted to price per barrel
  if (metal.metal === 'gasoline' || metal.metal === 'diesel') {
    metal.price = (metal.price * 42)
  }
  console.log(metal)
  await Metal.create(metal)
}

const types = config.metals
async function main () {
  for (const key in types) {
    const metal = await axios.get(types[key])
    await saveMetal(metal.data, key)
  }
  console.log('Finish updating metals')
  process.exit()
}
main()
