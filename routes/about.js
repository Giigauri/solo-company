const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('about', {
        title: 'ჩვენს შესახებ',
        activeNav: 'about'
    })
})

module.exports = router