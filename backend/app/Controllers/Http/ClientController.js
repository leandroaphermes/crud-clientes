'use strict'

const Helpers = use('Helpers')
const uuidv4 = require("uuid/v4")

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Client = use('App/Models/Client')

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl')

const NotFoundException = use('App/Exceptions/NotFoundException')
const RequiredParameterException = use('App/Exceptions/RequiredParameterException')
const { ModelNotFoundException } = require('@adonisjs/lucid/src/Exceptions')

class ClientController {

  async index({ request }){

    const params = request.only([ "page", "search" ])

    const dataRes = await Client.query()
      .where("name", "LIKE", `%${params.search ? params.search : ""}%`)
      .orWhere("cpf", "LIKE", `%${params.search ? params.search.replace(/[^0-9]+/g, "") : ""}%`)
      .orderBy('updated_at', 'desc')
      .paginate( params.page && params.page > 1 ? params.page : 1, 10)
    
    return dataRes
  }

  async store({ request, response }) {

    const data = request.only([
      "cpf",
      "name",
      "phone"
    ])

    const photo = request.file('photo', {
      types: ['image'],
      extnames: ["gif", "png", "jpeg", "jpg"],
      size: "10mb"
    })
    
    let filename = ""

    if(photo){
      filename = `${new Date().getTime()}-${uuidv4()}.${photo.subtype}`

      await photo.move( Helpers.tmpPath(`/images`), {
        name: filename,
        overwrite: true
      })

      if (!photo.moved()) {
        const erro = photo.error()
        return response.unprocessableEntity({
          message: erro.message,
          type: erro.type,
          field: erro.fieldName
        })
      }
    }

    data.photo_url = filename || null

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

      const photo = request.file('photo', {
        types: ['image'],
        extnames: ["gif", "png", "jpeg", "jpg"],
        size: "10mb"
      })
      
      let filename = ""
  
      if(photo){
        filename = `${new Date().getTime()}-${uuidv4()}.${photo.subtype}`
  
        await photo.move( Helpers.tmpPath(`/images`), {
          name: filename,
          overwrite: true
        })
  
        if (!photo.moved()) {
          const erro = photo.error()
          return response.unprocessableEntity({
            message: erro.message,
            type: erro.type,
            field: erro.fieldName
          })
        }
      }
  
      data.photo_url = filename || null

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

  fileImage({ params, response}){

    if(params.file === ""){
        return ""
    }

    const file_directory = params.file === "default.jpg" ? Helpers.tmpPath(`/../resources/default.jpg`) : Helpers.tmpPath(`/images/${params.file}`)

    return response.download(file_directory)

  }

}

module.exports = ClientController
