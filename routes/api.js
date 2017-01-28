const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const config = require('../config.json')

const authCheck = new jwt(config.jwt)

router.get('/', (req, res) => {
    res.send('works')
})

router.get('/pins', (req, res) => {
    res.json([{
        id: '43441324',
        url: 'http:/dsds',
        description: 'http:/dsds'
    }, {
        id: '43441324',
        url: 'http:/dsds',
        description: 'http:/dsds'
    }])
})

module.exports = router
