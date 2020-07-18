'use strict'

const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {

  getPhotoUrl(photo_url){

    return photo_url ? `${ Env.get('NODE_ENV') !== 'development' ? Env.get('APP_PUBLIC_URL') : Env.get('APP_URL')}/files/${photo_url}` : ""


  }

}

module.exports = Client
