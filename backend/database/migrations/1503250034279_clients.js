'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.bigInteger('cpf')
        .unsigned()
        .notNullable()
        .unique()
      table.string('name', 100)
        .notNullable()
      table.bigInteger('phone')
        .notNullable()
      table.string('photo_url')
        .nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
