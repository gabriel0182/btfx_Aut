// Wrapper class for running headless Cypress tests
// The purpose of this class is to encapsulate the runs and perform pre and post processing of
// the output to produce a comprehensive report 

const cypress = require('cypress')
const yargs = require('yargs')
const { merge } = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')
const rm = require('rimraf')
const cypressConfig = require('./cypress')
const ls = require('ls')
const fs = require('fs');

const argv = yargs.options({
    'browser': {
        alias: 'b',
        describe: 'choose browser that you wanna run tests on',
        default: 'electron',
        choices: ['chrome', 'electron']
    },
    'spec': {
        alias: 's',
        describe: 'run test with specific spec file',
        default: 'cypress/integration/*.feature'
    },
    'title': {
        alias: 't',
        describe: 'the report browser tab and page title',
        default: 'Cypress Report'
    }
}).help()
    .argv

const reportDir = cypressConfig.reporterOptions.reportDir
const reportFiles = `${reportDir}/*`
// list all of existing report files
ls(reportFiles, file => console.log(`removing ${file.full}`))

// delete all existing report files
rm(reportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`)
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
    console.log('Initalizing Cypress and running tests.. Please wait')
})

let runResult;

cypress.run({
    browser: argv.browser,
    spec: argv.spec
}).then((results) => {
    runResult = results
    const reporterOptions = {
        reportDir: results.config.reporterOptions.reportDir,
        files: [`./${runResult.config.reporterOptions.reportDir}/*.json`],
        inline: true,
        reportTitle: argv.title,
        reportPageTitle: argv.title,
        reportFilename: `cypress-report-${results.startedTestsAt.split(".")[0].split(":").join("_")}`
    }
    generateReport(reporterOptions)
}).catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
})

function generateReport(options) {
    return merge(options).then((report) => {
        marge.create(report, options).then(() => outputResponse(options)).catch(e => console.log("Error generating report!\n" + e.stack))
    })
}

function outputResponse(options) {

    let specResults = []

    runResult.runs.forEach(run => {
        let screenshots = run.tests.map(t => t.attempts.map(a => a.screenshots)).flat(2)
        specResults.push({
            screenshots: screenshots.map(ss => `.${ss.path.split("mochawesome-report").pop()}`),
            passed: run.stats.passes == run.stats.tests,
            video: `${run.video.split("mochawesome-report").pop()}`,
            specPath: run.spec.relative,
        })
    })

    let cypressResultSubset = {
        "startedTestsAt": runResult.startedTestsAt,
        "endedTestsAt": runResult.endedTestsAt,
        "totalDuration": runResult.totalDuration,
        "totalSuites": runResult.totalSuites,
        "totalTests": runResult.totalTests,
        "totalFailed": runResult.totalFailed,
        "totalPassed": runResult.totalPassed,
        "totalPending": runResult.totalPending,
        "totalSkipped": runResult.totalSkipped,
        "browserPath": runResult.browserPath,
        "browserName": runResult.browserName,
        "browserVersion": runResult.browserVersion,
        "osName": runResult.osName,
        "osVersion": runResult.osVersion,
        "cypressVersion": runResult.cypressVersion,
        "specResults": specResults
    }

    fs.writeFileSync(`${options.reportDir}/cypress-e2e-runresult.json`, JSON.stringify(cypressResultSubset))

    if (runResult.totalFailed !== 0) {
        console.error(`${runResult.totalFailed} test(s) failed :'( Exiting with non-zero value and outputting the results object: `, runResult)
        process.exit(1)
    } else {
        console.error(`All tests passed :)`)
        process.exit(0)
    }
}