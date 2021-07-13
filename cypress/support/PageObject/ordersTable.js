class ordersTable {
	static cancelOrder() {
		cy.get('[data-qa-id="orders-table-row"]')
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
				cy.get('span.filter-select__selection-label').should('contain', 'Bids')
			})
	}
	static orderFilterAskExch() {
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
				cy.get('span.filter-select__selection-label').contains('Asks').click()
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
				cy.get('span.filter-select__selection-label').should('contain', 'Asks')
			})
	}
	static clearFilters() {
		cy.get('[data-qa-id="orders"]')
			.within(() => {
				cy.get('button.filter-select__menu-btn').click()
			})
			.get('[data-qa-id="orders-filter-menu"]')
			.within(() => {
				cy.get('[data-qa-id="orders-filter-menu-button-reset"]').contains('Reset').click()
			})
	}
	static sortingOrderTable() {
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Pair')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(3)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'BTC/USD')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Context')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Exchange')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Type')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(9)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Limit')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Type')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(9)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Limit')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Amount')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(12)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Amount')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(12)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('CCY')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(16)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'BTC')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('CCY')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(16)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'BTC')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Price')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(18)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Price')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(18)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Status')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(25)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Active')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Status')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(25)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
					.should('contain', 'Active')
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Placed')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(28)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('[data-qa-id="orders-table"]')
			.within(() => {
				cy.get('div.table-vir__cell-sortable')
					.get('span.table__title-titlewrapper')
					.contains('Placed')
					.click()
			})
			.get('[data-qa-id="orders-table-row"]')
			.first()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(28)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
	}
}
export default ordersTable
