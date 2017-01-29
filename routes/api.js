const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const config = require('../config.json')
const User = require('../models/User')

const authCheck = new jwt(config.jwt)

router.get('/', (req, res) => {
    res.send('works')
})

router.post('/signup', (req, res) => {
    let user = new User({
        name: req.body.name,
        picture: req.body.picture,
        twitter: {
            id: req.body.global_client_id
        }
    })
    User.findOne({
        'twitter.id': user.twitter.id
    }).exec()
    .then(u=>{
        if(u)
            res.json(u)
        else
            user
                .save()
                .then((us)=>{
                    res.json(us)
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
    })
    .catch(err=>{
        res.status(400).json(err)
    })
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
