'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

  getPhotoUrl(photo_url){

    return photo_url ? `${Env.get('APP_URL')}/files/${photo_url}` : ""


  }

}

module.exports = Client
