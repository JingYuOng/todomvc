require('console.table')

const figlet = require('figlet')
const chalk = require('chalk')
const cypress = require('cypress')
const Promise = require('bluebird')
// const names = ['ampersand', 'angularjs', 'backbone', 'react', 'vue']
const names = ['ampersand', 'vue']

const testFramework = framework => {
  console.log(figlet.textSync(framework))

  const addInfo = testResults => {
    delete testResults.screenshots
    delete testResults.video
    delete testResults.version
    delete testResults.duration
    testResults.framework = framework
    return testResults
  }

  const addColors = testResults => {
    testResults.failures = testResults.failures
      ? chalk.red(testResults.failures)
      : chalk.green(testResults.failures)
    return testResults
  }

  return cypress
    .run({
      env: {
        framework
      }
    })
    .then(addInfo)
    .then(addColors)
}

Promise.mapSeries(names, testFramework)
  .then(results => {
    console.table('TodoMVC results', results)
  })
  .catch(e => {
    console.error('problem testing frameworks')
    console.error(e)
  })
