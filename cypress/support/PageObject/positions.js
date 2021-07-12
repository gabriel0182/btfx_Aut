class positions {
	static cancelPosition() {
		cy.get('[data-qa-id="positions-table-row"]')
			.first()
			.within(() => {
				cy.get('button.ui-button.ui-button--grey.ui-button--size-XS').get('i.fa-times').click()
			})
			.get('div.ui-modaldialog__footer')
			.within(() => {
				cy.get('[data-qa-id="modal-dialog-action-button"]').contains('Okay').click()
			})
	}
}
export default positions
