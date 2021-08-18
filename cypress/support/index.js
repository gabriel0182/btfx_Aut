import './commands'

Cypress.on('window:before:load', (window) => {
	Object.defineProperty(window.navigator, 'language', { value: 'en-GB' })
})

// This hook runs after every tests, it will add screenshot and video links into the test data
// This will be used to enhance reporting
const addContext = require('mochawesome/addContext')
Cypress.on('test:after:run', (test, runnable) => {
	debugger
	let specName = Cypress.spec.name
	let relativeVideoPath = `../../videos/${specName}.mp4`

	addContext({ test }, relativeVideoPath)

	if (test.state === 'failed') {
		let relativeScreenshotPath = `../../screenshots`

		for (let i = 0; i <= Cypress.config('retries').runMode; i++) {
			const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed)${
				i == 0 ? '' : ` (attempt ${i + 1})`
			}.png`
			const screenshotFileNameBeforeEach = `${runnable.parent.title} -- ${
				test.title
			} -- before each hook (failed)${i == 0 ? '' : ` (attempt ${i + 1})`}.png`
			const screenshotFileNameBeforeAll = `${runnable.parent.title} -- ${
				test.title
			} -- before all hook (failed)${i == 0 ? '' : ` (attempt ${i + 1})`}.png`

			addContext({ test }, `${relativeScreenshotPath}/${specName}/${screenshotFileName}`)
			addContext({ test }, `${relativeScreenshotPath}/${specName}/${screenshotFileNameBeforeEach}`)
			addContext({ test }, `${relativeScreenshotPath}/${specName}/${screenshotFileNameBeforeAll}`)
		}
	}
})
