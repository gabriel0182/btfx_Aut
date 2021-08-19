///  <reference types="cypress"/>

import notification from '../../../support/PageObject/notification'
import orderBook from '../../../support/PageObject/orderBook'

When('I click on the bell icon within an Order Book {string} entry to add an alert', (bidAsk) => {
	orderBook.addAlert(bidAsk)
})

When('I click on the bell icon within an Order Book {string} entry to del an alert', (bidAsk) => {
	orderBook.removeAlert(bidAsk)
})

Then('I get an alert containing: {string}', (notificationMessage) => {
	notification.isVisible()
	notification.containsMessage(notificationMessage)
	notification.closeNotification()
})

And('A bell icon is displayed within the Order Book {string} entry', (bidAsk) => {
	orderBook.bellIconIsDisplayed(bidAsk)
})

And('The bell icon is hidden within the Order Book {string} entry', (bidAsk) => {
	orderBook.bellIconIsHidden(bidAsk)
})
