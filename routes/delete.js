const {Router} = require('express')
const registration = require('../models/regmodel')
const router = Router()


router.get('/:id', async (req, res) => {
    const user = await registration.findByIdAndDelete(req.params.id)
    res.redirect('/users')
})


module.exports = router