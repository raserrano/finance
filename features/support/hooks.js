const { AfterAll, After, BeforeAll, Before } = require('@cucumber/cucumber')
const { Builder } = require('selenium-webdriver')
const exec = require('child_process').exec

const port = process.env.PORT || '3000'
let server, driver

BeforeAll(async function () {
  driver = await new Builder().forBrowser('chrome').build()
  const app = require('../../app')
  const http = require('http')
  app.set('port', port)
  server = http.createServer(app)
  server.listen(port)
})

Before(async function () {
  this.driver = driver
  this.port = port
  this.baseURL = `http://localhost:${port}`
})

After(async function () {

})

AfterAll(async function () {
  await driver.close()
  server.close()
  exec('open output/cucumber-report.html', () => {
    console.log('Opening report')
    process.exit(0)
  })
})
