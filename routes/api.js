const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const config = require('../config.json')
const User = require('../models/User')
const Pin = require('../models/Pin')

const authCheck = jwt(config.jwt)

router.get('/', (req, res) => {
    res.send('works')
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    let user = new User({
        name: req.body.name,
        picture: req.body.picture,
        twitter: {
            id: req.body.global_client_id,
        },
        userId: req.body.user_id
    })
    console.log(user)
    User.findOne({
            'userId': user.userId
        }).exec()
        .then(u => {
            if (u)
                res.json(u)
            else
                user
                .save()
                .then((us) => {
                    res.json(us)
                })
                .catch(err => {
                    res.status(400).json(err)
                })
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.delete('/pin/:pinId', authCheck, (req, res) => {
    var userId
    User.findOne({
            'userId': req.user.sub
        }).exec()
        .then(u => {
            if (!u)
                throw 'error'
            userId = u._id
            return Pin.findById(req.params.pinId).exec()
        })
        .then(pin => {
            console.log(pin)
            return pin.remove()
        })
        .then(() => {
            console.log('removed')
            res.json(1)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

router.post('/pin', authCheck, (req, res) => {
    let pin = new Pin(req.body)
    User.findOne({
            'userId': req.user.sub
        }).exec()
        .then(u => {
            if (!u)
                throw 'error'
            pin.user = u._id
            return pin.save()
        })
        .then(pin => {
            res.json(pin)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.get('/pin/star/:pinId', authCheck, (req, res) => {
    var userId
    User.findOne({
            'userId': req.user.sub
        }).exec()
        .then(u => {
            if (!u)
                throw 'error'
            userId = u._id
            return Pin.findById(req.params.pinId).exec()
        })
        .then(pin => {
            if (pin.stars.indexOf(userId) != -1) {
                pin.stars = pin.stars.filter(uId => uId + '' != userId + '')
            } else {
                pin.stars.push(userId)
            }
            return pin.save()
        })
        .then(pin => {
            res.json(pin)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.get('/pins', (req, res) => {
    Pin.find({})
        .populate('user')
        .exec()
        .then(pins => {
            res.json(pins)
        }).catch(err => {
            res.status(400).json(err)
        })
})

router.get('/mypins', authCheck, (req, res) => {
    User.findOne({
            'userId': req.user.sub
        }).exec()
        .then(u => {
            if (!u)
                throw 'error'
            return Pin.find({
                    user: u._id
                })
                .populate('user')
                .exec()
        })
        .then(pins => {
            res.json(pins)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router
