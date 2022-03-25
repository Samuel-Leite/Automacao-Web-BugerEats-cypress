import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage';

describe('Sign Up at Buger Eats', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // });

    it('Registration with valid data', function () {

        var deliver = signupFactory.deliver()

        // Commands to interact in Buger Eats
        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        // Validate inclusion success message
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    });

    it('Registration with incorrect documents', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = 'Z00000000AB'

        // Commands to interact in Buger Eats
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    });

    it('Registration with incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'samuel.com.br'

        // Commands to interact in Buger Eats
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    });

    it('Registration with incorrect whatsapp', function () {

        var deliver = signupFactory.deliver()

        deliver.whatsapp = '999999999999'

        // Commands to interact in Buger Eats
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Whatsapp com formato incorreto')
    });

    it('Registration with incorrect postal code', function () {

        var deliver = signupFactory.deliver()

        deliver.address.postalcode = '00000'
        deliver.address.street = ''
        deliver.address.district = ''
        deliver.address.city_state = ''

        // Commands to interact in Buger Eats
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
    });

    context('Require fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            // Commands to interact in Buger Eats
            SignupPage.go()
            SignupPage.submit()
            
        });

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })

    });
});