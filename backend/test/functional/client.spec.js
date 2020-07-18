'use strict'

const { test, trait } = use('Test/Suite')('Client')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Helpers = use('Helpers')
const Factory = use('Factory')

trait('Test/ApiClient')

test('Listando Clientes', async ({ assert, client  }) => {
  
  await Factory.model('App/Models/Client').createMany(5)

  const response = await client.get(`/clients`)
    .end()


  response.assertStatus(200)
  assert.isObject(response.body)
  assert.isArray(response.body.data)
  assert.isNotEmpty(response.body.data)
  assert.exists(response.body.data[0].name)

}).timeout(6000)

test('Cadastrando Cliente', async ({ assert, client  }) => {
  
  const { name, cpf, phone } = await Factory.model('App/Models/Client').make()

  const response = await client.post(`/clients`)
    .send({ name, cpf, phone })
    .end()

  response.assertStatus(201)
  assert.isObject(response.body)
  assert.exists(response.body.id)
  assert.exists(response.body.name)

})

test('Cadastrando Cliente com Foto', async ({ assert, client  }) => {
  
  const { name, cpf, phone } = await Factory.model('App/Models/Client').make()

  const response = await client.post(`/clients`)
    .field("name", name)
    .field("cpf", cpf)
    .field("phone", phone)
    .attach('photo', Helpers.tmpPath('../resources/default.jpg'))
    .end()

  response.assertStatus(201)
  assert.isObject(response.body)
  assert.exists(response.body.id)
  assert.exists(response.body.name)
  assert.exists(response.body.photo_url)

})

test('Atualizando Dados de Cliente', async ({ assert, client  }) => {
  
  const { id } = await Factory.model('App/Models/Client').create()

  const response = await client.post(`/clients/${id}`)
    .send({ name: "Teste 0010" })
    .end()

  response.assertStatus(202)
  assert.isObject(response.body)
  assert.exists(response.body.id)
  assert.exists(response.body.name)

})

test('Atualizando Dados de com Foto Cliente', async ({ assert, client  }) => {
  
  const { id } = await Factory.model('App/Models/Client').create()

  const response = await client.post(`/clients/${id}`)
    .field("name", "Novo dados de nome")
    .attach('photo', Helpers.tmpPath('../resources/default.jpg'))
    .end()

  response.assertStatus(202)
  assert.isObject(response.body)
  assert.exists(response.body.id)
  assert.exists(response.body.name)

})

test('Excluindo Cliente', async ({ assert, client  }) => {
  
  const { id, cpf, phone, photo_url } = await Factory.model('App/Models/Client').create()

  const response = await client.delete(`/clients/${id}`)
    .end()

  response.assertStatus(204)
  assert.isEmpty(response.body)

})
