const {assert} = require('chai')
const supertest = require('supertest')
const {app,server} = require('../server')
require('colors')

const api = supertest(app)

describe('Probando rutas',() =>{
    console.log('CLEANING DB BEFORE TESTS SORRY :V '.bgRed+'')
    console.log = function() {}
    it('Abrir servidor',async()=>{
        const response = await api.get('/api/')
        assert.deepEqual(response.body,{ code: 'OK', SERVER_STATUS: 'READY' })
    })
    
    it('Crear usuario',async()=>{
        const response = await api.post('/api/user').send({name:'simio',mail:'simio@gmail.com',password:'puta'})
        assert.deepEqual(response.statusCode,201)
    })

    it('Loging usuario',async()=>{
        const response = await api.post('/api/user/login').send({name:'simio',mail:'simio@gmail.com',password:'puta'})
        assert.deepEqual(response.statusCode,200)
    })

    it('Cerrar server', () => {
        server.close()
    });
    
})