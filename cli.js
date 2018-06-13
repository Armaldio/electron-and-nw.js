#!/usr/bin/env node
const chalk = require('chalk')
const getStats = require('./lib')

const checkTotal = (data, type) => {
  if (data.total >= 100000) {
    console.log(`Game over, ${type} has already reached 100K stars!`)
    process.exit()
  }
}

const main = async () => {
  process.stdout.write('> Fetching data, please wait...')
  const { electron, nwjs } = await getStats()
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(
    chalk.dim(
      `Don't take this serious, this is just for fun, we love both React and Vue from the bottom of our hearts!\n`
    )
  )

  checkTotal(electron, 'Vue')
  checkTotal(nwjs, 'React')

  console.log(
    `${chalk.bold(`- At this rate:`)}\n${chalk.green(
      `Vue (${electron.rate} stars/day)`
    )} will take ${chalk.green(electron.remainingDays)} days\n${chalk.blue(
      `React (${nwjs.rate} stars/day)`
    )} will take ${chalk.blue(
      nwjs.remainingDays
    )} days\nto reach ${chalk.yellow(`100K stars`)} on GitHub.\n`
  )
  console.log(
    'source: ' + chalk.dim.underline('https://github.com/Armaldio/electron-and-nw.js')
  )
}

main().catch(console.error)
