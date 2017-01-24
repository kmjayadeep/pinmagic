const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('works')
})

router.get('/posts', (req, res) => {
    res.json([{
        title: 'jaba',
        body: 'adsaddsdsad'
    }, {
        title: 'jaba2',
        body: 'adsadddasdadssdsad'
    }])
})

module.exports = router
