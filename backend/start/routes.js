'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/clients', 'ClientController.index')
Route.get('/clients/:id', 'ClientController.show')
Route.post('/clients', 'ClientController.store').validator('StoreClient')
Route.post('/clients/:id', 'ClientController.update').validator('UpdateClient')
Route.delete('/clients/:id', 'ClientController.destroy')

Route.get('/files/:file', 'ClientController.fileImage')
