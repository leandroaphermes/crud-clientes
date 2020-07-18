'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


Factory.blueprint('App/Models/Client', (faker, i, data) => {

  return {
    cpf: faker.integer({ min: 10000000000, max: 99999999999 }), 
    name: faker.name({ prefix: false }),
    phone: parseInt(`9${faker.phone({ formatted: false })}`),
    photo_url: (faker.bool()) ? "default.jpg" : null
  }
})
