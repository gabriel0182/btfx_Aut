class ordersTable {
	static cancelOrder() {
		const ordersTable = cy
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('button.ui-button.ui-button--grey.ui-button--size-XS').get('i.fa-times').click()
			})
	}
	static orderFilterBidExch() {
		cy.get('[data-qa-id="orders"]')
			.within(() => {
				cy.get('button.filter-select__menu-btn').click()
			})
			.get('[data-qa-id="orders-filter-menu"]')
			.within(() => {
				cy.get('span.filter-select__selection-label').contains('Exchange').click()
			})
			.get('[data-qa-id="orders-filter-menu"]')
			.within(() => {
				cy.get('span.filter-select__selection-label').contains('Bids').click()
			})
			.get('[data-qa-id="orders-filter-menu"]')
			.within(() => {
				cy.get('[data-qa-id="orders-filter-menu-button-apply"]').contains('Apply').click()
			})
			.get('div.filter-select__summary')
			.first()
			.within(() => {
				cy.get('span.filter-select__selection-label').should('contain', 'Exchange')
			})
			.get('div.filter-select__summary')
			.last()
			.within(() => {
				cy.get('span.filter-select__selection-label').should('contain', 'Exchange')
			})
	}
}
export default ordersTable
