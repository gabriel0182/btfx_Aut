class TradesTable {
	validateMarket() {
		const headers = cy.waitUntil(() =>
			cy
				.get(
					'#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body'
				)
				.get(
					'.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]'
				)
				.invoke('text')
				.should('contain', 'Time')
				.get(
					'.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]'
				)
				.invoke('text')
				.should('contain', 'Price')
				.get(
					'.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]'
				)
				.invoke('text')
				.should('contain', 'Amount')
		)
		const color = cy
			.get('#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
			.invoke('css', 'background-color')
			.then(background => {
				cy.get('div.trades-table')
					.invoke('attr', 'style', `background-color: ${background}`)
					.then(element => {
						expect(element).to.have.css('background-color', background)
					})
			})
			.should('have.css', 'color', 'rgb(255, 255, 255)')
		return this
	}
	validateYours() {
		const yours = cy
			.get(
				'#recent-trades > .collapsible > .ui-collapsible__header > [style="visibility: visible;"] > [style="display: flex; font-size: 0.8rem; flex-direction: row; align-items: flex-end; justify-content: center;"]'
			)
			.get('#trades-toggle > span')
		yours.click()
		const yourHeaders = cy
			.get('.trades-table__header')
			.get(
				'.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]'
			)
			.invoke('text')
			.should('contain', 'Time')
			.get(
				'.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]'
			)
			.invoke('text')
			.should('contain', 'Price')
			.get(
				'.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]'
			)
			.invoke('text')
			.should('contain', 'Amount')
		const yoursColor = cy
			.get('#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
			.should('have.css', 'color', 'rgb(255, 255, 255)')
		return this
	}
	sortingOrderHistory() {
		const pairUp = cy
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'BTC/USD')
		const pairDown = cy
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'BTC/USD')
		const contextUp = cy
		cy.get(
			':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
		)
			.within(() => {
				cy.get(':nth-child(3) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Context')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'Exchange')
		const contextDown = cy
		cy.get(
			':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
		)
			.within(() => {
				cy.get(':nth-child(3) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Context')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'Exchange')
		const typeUp = cy
		cy.get(
			':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
		)
			.within(() => {
				cy.get(':nth-child(4) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Type')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'Fill or kill')
		const typeDown = cy
			.get(
				':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
			)
			.within(() => {
				cy.get(':nth-child(4) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Type')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('[style="flex: 0 1 70px; min-width: 70px; max-width: 70px;"]')
			.get(':nth-child(1) > span')
			.should('contain', 'Trailing stop')
		const amountUp = cy
		cy.get(
			':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
		)
			.within(() => {
				cy.get(':nth-child(5) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Amount')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('span[style="line-height: 20px;"]')
			.get(':nth-child(1) > span')
			.should($val => {
				expect($val).not.to.be.null
			})
		const amountDown = cy
		cy.get(
			':nth-child(2) > :nth-child(6) > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body > [style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header'
		)
			.within(() => {
				cy.get(':nth-child(5) > .table__title-titlewrapper > :nth-child(1)')
					.contains('Amount')
					.click()
			})
			.get('[aria-rowindex="1"]')
			.first()
			.get('span[style="line-height: 20px;"]')
			.get(':nth-child(1) > span')
			.should($val => {
				expect($val).not.to.be.null
			})
		const ccyUp = cy
			.get(
				'[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		ccyUp
			.click()
			.get('[aria-rowindex="1"]')
			.get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .show50')
			.first()
			.should($val1 => {
				expect($val1).not.to.be.null
			})
		const ccyDown = cy
			.get(
				'[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		ccyDown
			.click()
			.get('[aria-rowindex="1"]')
			.get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .show50')
			.first()
			.should('contain', 'IOTA')
		const priceUp = cy
			.get(
				'[style="flex: 1 1 80px; min-width: 80px; max-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 80px; min-width: 80px; max-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		priceUp
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 1 1 80px; min-width: 80px; max-width: 100px;"] > .virtable__cellwrapper > :nth-child(1) > span'
			)
			.should($val1 => {
				expect($val1).not.to.be.null
			})
		const priceDown = cy
			.get(
				'[style="flex: 1 1 80px; min-width: 80px; max-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 80px; min-width: 80px; max-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		priceDown
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 1 1 80px; min-width: 80px; max-width: 100px;"] > .virtable__cellwrapper > :nth-child(1) > span'
			)
			.should($val2 => {
				expect($val2).not.to.be.null
			})
		const averageUp = cy
			.get(
				'[style="flex: 1 1 115px; min-width: 115px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 115px; min-width: 115px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		averageUp
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 1 1 115px; min-width: 115px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
			)
			.should($val3 => {
				expect($val3).not.to.be.null
			})
		const averageDown = cy
			.get(
				'[style="flex: 1 1 115px; min-width: 115px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 1 1 115px; min-width: 115px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		averageDown
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 1 1 115px; min-width: 115px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
			)
			.should($val4 => {
				expect($val4).not.to.be.null
			})
		const statusUp = cy
			.get(
				'[style="flex: 0 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		statusUp
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 0 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > .ui-tooltip--underline > ._3ZT6FhS8zuiHfgB0PXtJOI'
			)
			.should('contain', 'Cancelled')
		const statusDown = cy
			.get(
				'[style="flex: 0 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 90px; min-width: 90px; display: flex; justify-content: center;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		statusDown
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 0 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > .ui-tooltip--underline > ._3ZT6FhS8zuiHfgB0PXtJOI'
			)
			.should($val1 => {
				expect($val1).not.to.be.null
			})
		const inactiveUp = cy
			.get(
				'[style="flex: 0 1 160px; min-width: 80px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 160px; min-width: 80px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		inactiveUp
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 0 1 160px; min-width: 80px;"] > .virtable__cellwrapper'
			)
			.should($val5 => {
				expect($val5).not.to.be.null
			})
		const inactiveDown = cy
			.get(
				'[style="flex: 0 1 160px; min-width: 80px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
			)
			.get(
				'[style="flex: 0 1 160px; min-width: 80px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
			)
		inactiveDown
			.click()
			.get(
				'[aria-rowindex="1"] > [style="flex: 0 1 160px; min-width: 80px;"] > .virtable__cellwrapper'
			)
			.should($val6 => {
				expect($val6).not.to.be.null
			})
		return this
	}
}
export default TradesTable
