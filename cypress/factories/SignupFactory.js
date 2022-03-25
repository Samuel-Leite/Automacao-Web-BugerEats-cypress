var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default{
    deliver: function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '99999999999',
            address:{
                postalcode: '02860-001',
                street: 'Avenida Deputado Cantídio Sampaio',
                number: '100',
                details: 'Bloco 19',
                district: 'Vila Souza',
                city_state: 'São Paulo/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}