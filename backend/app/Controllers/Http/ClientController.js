'use strict'


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

const NotFoundException = use('App/Exceptions/NotFoundException')
const RequiredParameterException = use('App/Exceptions/RequiredParameterException')
const { ModelNotFoundException } = require('@adonisjs/lucid/src/Exceptions')

class ClientController {

  async index(){

    const dataRes = await Client.all()
    
    return dataRes
  }

  async store({ request, response }) {

    const data = request.only([
      "cpf",
      "name",
      "phone"
    ])

    const dataRes = await Client.create(data)

    response.created(dataRes)

  }
  
  async update({ request, response }) {

    const data = request.only([
      "cpf",
      "name",
      "phone"
    ])

    if(!request.params.id || request.params.id < 1) throw new RequiredParameterException(Antl.formatMessage("client.requiredParameterEndpoint"))
    
    try {

      const dataRes = await Client.findOrFail(request.params.id)
      dataRes.merge(data)
      await dataRes.save(data)

      response.accepted(dataRes)

    } catch (error) {
      if(error instanceof ModelNotFoundException){
        throw new NotFoundException(Antl.formatMessage("client.notFound"))
      }else{
        throw error
      }
    }


  }
  
  async show({ params, response }){

    if(!params.id || params.id < 1) throw new RequiredParameterException(Antl.formatMessage("client.requiredParameterEndpoint"))
    
    try {
      
      const dataRes = await Client.findOrFail(params.id)

      response.ok(dataRes)

    } catch (error) {
      if(error instanceof ModelNotFoundException){
        throw new NotFoundException(Antl.formatMessage("client.notFound"))
      }else{
        throw error
      }
    }

  }
  
  async destroy({ params, response }){

    if(!params.id || params.id < 1) throw new RequiredParameterException(Antl.formatMessage("client.requiredParameterEndpoint"))
    
    try {
      
      const dataRes = await Client.findOrFail(params.id)

      await dataRes.delete()

      response.noContent()

    } catch (error) {
      if(error instanceof ModelNotFoundException){
        throw new NotFoundException(Antl.formatMessage("client.notFound"))
      }else{
        throw error
      }
    }

  }

}

module.exports = ClientController
