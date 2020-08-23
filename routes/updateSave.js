const {Router} = require('express')
const registration = require('../models/regmodel')
const router = Router()

router.post('/', async (req, res) => {
    try{
        const icon = (req.body.gender == 1) ? "male" : "female"
        const {id} = req.body // 
        delete req.body.id // 
        req.body.icon = icon
        await registration.findByIdAndUpdate(id, req.body)
        res.redirect(`/users`)

    } catch (e) {
        console.log(e)
    }
})

module.exports = router
