class SignupPage{

    go(){
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(delivery){
                // Filling in delivery details
                cy.get('input[name="fullName"]').type(delivery.name)
                cy.get('input[name="cpf"]').type(delivery.cpf)
                cy.get('input[name="email"]').type(delivery.email)
                cy.get('input[name="whatsapp"]').type(delivery.whatsapp)
        
                // Filling in the delivery address
                cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
                cy.get('input[type=button][value="Buscar CEP"]').click()
                cy.get('input[name="address-number"]').type(delivery.address.number)
                cy.get('input[name="address-details"]').type(delivery.address.details)
        
                // Validation of disabled fields that were filled through the CEP
                cy.get('input[name="address"]').should('have.value', delivery.address.street)
                cy.get('input[name="district"]').should('have.value', delivery.address.district)
                cy.get('input[name="city-uf"]').should('have.value', delivery.address.city_state)
        
                // Selecting delivery method
                cy.contains('.delivery-method li', delivery.delivery_method).click
        
                // Submit your driver's license
                cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh)
    }

    submit(){
        // Click on the inclusion button
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage){
        // CPF error message validation
        // cy.get('span[class="alert-error"]').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;