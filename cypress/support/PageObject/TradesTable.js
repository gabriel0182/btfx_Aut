class TradesTable {
	static validateMarket() {
		cy.waitUntil(() =>
			cy
			.get('.trades-table__header')
				.within(()=>{
					cy
					.get('.trades-table__header-cell')
					.eq(1)
					.invoke('text')
					.should('contain', 'Time')
				})
			.get('.trades-table__header')
				.within(()=>{
					cy
					.get('.trades-table__header-cell')
					.eq(2)
					.invoke('text')
					.should('contain', 'Price')
				})
				.get('.trades-table__header')
				.within(()=>{
					cy
					.get('.trades-table__header-cell')
					.eq(3)
					.invoke('text')
					.should('contain', 'Amount')
				})
			.get('.trades-table')
			.invoke('css', 'background-color')
			.then(background => {
				cy.get('div.trades-table')
					.invoke('attr', 'style', `background-color: ${background}`)
					.then(element => {
						expect(element).to.have.css('background-color', background)
					})
			})
			.should('have.css', 'color', 'rgb(255, 255, 255)')
		)
	}
	static validateYours() {
		cy
			.get('#trades-toggle')
			.contains('Yours')
		.click()
		cy
		.get('.trades-table__header')
			.within(()=>{
				cy
				.get('.trades-table__header-cell')
				.eq(1)
				.invoke('text')
				.should('contain', 'Time')
			})
			.get('.trades-table__header')
				.within(()=>{
					cy
					.get('.trades-table__header-cell')
					.eq(2)
					.invoke('text')
					.should('contain', 'Price')
				})
				.get('.trades-table__header')
				.within(()=>{
					cy
					.get('.trades-table__header-cell')
					.eq(3)
					.invoke('text')
					.should('contain', 'Amount')
				})
				cy.get('div.trades-table')
			.should('have.css', 'color', 'rgb(255, 255, 255)')
	}
	static sortingOrderHistory() {
		cy
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(()=>{
				cy
				.get('span.table-vir__cell')
				.get('span')
				.eq(3)
			.should('contain', 'BTC/USD')
			})
		cy
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Pair').click()
			})
			.get('[aria-rowindex="1"]')
			.last()
			.within(()=>{
				cy
				.get('span.table-vir__cell')
				.get('span')
				.eq(3)
			.should('contain', 'USDt/USD')
			})
		cy
		.get('div.themed-border')
		.get('div.table-vir__cell-sortable')
		.within(() => {
			cy.get('span.table__title-titlewrapper').contains('Context').click()
		})
		.get('[aria-rowindex="1"]')
			.last()
			.within(()=>{
				cy
				.get('span.table-vir__cell')
				.get('span')
				.eq(8)
				.should('contain', 'Exchange')
			})
			cy
			.get('div.themed-border')
			.get('div.table-vir__cell-sortable')
			.within(() => {
				cy.get('span.table__title-titlewrapper').contains('Context').click()
			})
			.get('[aria-rowindex="1"]')
				.last()
				.within(()=>{
					cy
					.get('span.table-vir__cell')
					.get('span')
					.eq(8)
					.should('contain', 'Margin')
				})
				cy
				.get('div.themed-border')
				.get('div.table-vir__cell-sortable')
				.within(() => {
					cy.get('span.table__title-titlewrapper').contains('Type').click()
				})
				.get('[aria-rowindex="1"]')
					.last()
					.within(()=>{
						cy
						.get('span.table-vir__cell')
						.get('span')
						.eq(9)
						.should('contain', 'Fill or kill')
					})
					cy
					.get('div.themed-border')
					.get('div.table-vir__cell-sortable')
					.within(() => {
						cy.get('span.table__title-titlewrapper').contains('Amount').click()
					})
					.get('[aria-rowindex="1"]')
						.last()
						.within(()=>{
							cy
							.get('span.table-vir__cell')
							.get('span')
							.eq(12)
							.should($val => {
								expect($val).not.to.be.null
							})
						})
						cy
						.get('div.themed-border')
						.get('div.table-vir__cell-sortable')
						.within(() => {
							cy.get('span.table__title-titlewrapper').contains('Amount').click()
						})
						.get('[aria-rowindex="1"]')
							.last()
							.within(()=>{
								cy
								.get('span.table-vir__cell')
								.get('span')
								.eq(12)
								.should($val => {
									expect($val).not.to.be.null
								})
							})
							cy
							.get('div.themed-border')
							.get('div.table-vir__cell-sortable')
							.within(() => {
								cy.get('span.table__title-titlewrapper').contains('CCY').click()
							})
							.get('[aria-rowindex="1"]')
								.last()
								.within(()=>{
									cy
									.get('span.table-vir__cell')
									.get('span')
									.eq(16)
									.should('contain','BTC')
								})
								.get('div.themed-border')
								.get('div.table-vir__cell-sortable')
								.within(() => {
									cy.get('span.table__title-titlewrapper').contains('CCY').click()
								})
								.get('[aria-rowindex="1"]')
									.last()
									.within(()=>{
										cy
										.get('span.table-vir__cell')
										.get('span')
										.eq(16)
										.get('span.show-smaller')
										.should('contain','USDt')
									})
										.get('div.themed-border')
										.get('div.table-vir__cell-sortable')
										.within(() => {
											cy.get('span.table__title-titlewrapper').contains('Price').click()
										})
										.get('[aria-rowindex="1"]')
											.last()
											.within(()=>{
												cy
												.get('span.table-vir__cell')
												.get('span')
												.eq(18)
												.should($val => {
													expect($val).not.to.be.null
												})
											})
											cy
											.get('div.themed-border')
											.get('div.table-vir__cell-sortable')
											.within(() => {
												cy.get('span.table__title-titlewrapper').contains('Price').click()
											})
											.get('[aria-rowindex="1"]')
												.last()
												.within(()=>{
													cy
													.get('span.table-vir__cell')
													.get('span')
													.eq(18)
													.should($val => {
														expect($val).not.to.be.null
													})
												})
												cy
												.get('div.themed-border')
												.get('div.table-vir__cell-sortable')
												.within(() => {
													cy.get('span.table__title-titlewrapper').contains('Average execution price').click()
												})
												.get('[aria-rowindex="1"]')
													.last()
													.within(()=>{
														cy
														.get('span.table-vir__cell')
														.get('span')
														.eq(21)
														.should($val => {
															expect($val).not.to.be.null
														})
													})
													cy
													.get('div.themed-border')
													.get('div.table-vir__cell-sortable')
													.within(() => {
														cy.get('span.table__title-titlewrapper').contains('Average execution price').click()
													})
													.get('[aria-rowindex="1"]')
														.last()
														.within(()=>{
															cy
															.get('span.table-vir__cell')
															.get('span')
															.eq(21)
															.should($val => {
																expect($val).not.to.be.null
															})
														})
														cy
														.get('div.themed-border')
														.get('div.table-vir__cell-sortable')
														.within(() => {
															cy.get('span.table__title-titlewrapper').contains('Status').click()
														})
														.get('[aria-rowindex="1"]')
															.last()
															.within(()=>{
																cy
																.get('span.table-vir__cell')
																.get('span')
																.eq(26)
																.should('contain', 'Cancelled')
															})
															cy
															.get('div.themed-border')
															.get('div.table-vir__cell-sortable')
															.within(() => {
																cy.get('span.table__title-titlewrapper').contains('Status').click()
															})
															.get('[aria-rowindex="1"]')
																.last()
																.within(()=>{
																	cy
																	.get('span.table-vir__cell')
																	.get('span')
																	.eq(25)
																	.get('div.virtable__cellwrapper')
																	.eq(4)
																	.should('contain', 'Cancelled')
																})
																	cy
																	.get('div.themed-border')
																	.get('div.table-vir__cell-sortable')
																	.within(() => {
																		cy.get('span.table__title-titlewrapper').contains('Inactive').click()
																	})
																	.get('[aria-rowindex="1"]')
																		.last()
																		.within(()=>{
																			cy
																			.get('span.table-vir__cell')
																			.get('span')
																			.eq(29)
																			.get('div.virtable__cellwrapper')
																			.eq(5)
																			.should($val => {
																				expect($val).not.to.be.null
																			})
																			})
																			cy
																			.get('div.themed-border')
																			.get('div.table-vir__cell-sortable')
																			.within(() => {
																				cy.get('span.table__title-titlewrapper').contains('Inactive').click()
																			})
																			.get('[aria-rowindex="1"]')
																				.last()
																				.within(()=>{
																					cy
																					.get('span.table-vir__cell')
																					.get('span')
																					.eq(31)
																					.should($val => {
																						expect($val).not.to.be.null
																					})
																					})
	}
}
export default TradesTable
