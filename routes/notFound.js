const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('notFound', {
        title: '404',
        activeNav: 'notFound'
    })
})

module.exports = router