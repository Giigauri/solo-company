const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('price', {
        title: 'ფასები',
        activeNav: 'price'
    })
})

module.exports = router