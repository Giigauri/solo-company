const {Router} = require('express')
const course = require('../models/courseModel')
const router = Router()

router.get('/', async (req, res) => {
    const success = (req.query.status) ? true : false
    res.render('home', {
        title: 'მთავარი',
        activeNav: 'home',
        success: success
    })
})

module.exports = router