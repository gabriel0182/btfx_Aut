class orderHistory {
	static sortingOrderHistory() {
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(3)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(3)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Context').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Context').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Type').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(9)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Amount').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(12)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Amount').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(12)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('CCY').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(16)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('CCY').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(16)
					.get('span.show-smaller')
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
			.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Price').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(18)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Price').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(18)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Average execution price').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(21)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Average execution price').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(21)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Status').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(26)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Status').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(25)
					.get('div.virtable__cellwrapper')
					.eq(4)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Inactive').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(29)
					.get('div.virtable__cellwrapper')
					.eq(5)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
		cy.get('div.themed-border')
			.get('div.orderhistory__collapsible')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Inactive').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(() => {
				cy.get('span.table-vir__cell')
					.get('span')
					.eq(31)
					.should('be.visible', true)
					.should(($val) => {
						expect($val).not.to.be.null
					})
			})
	}
}
export default orderHistory
