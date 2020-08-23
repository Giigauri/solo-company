const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('team', {
        title: 'დეველოპერები',
        activeNav: 'team'
    })
})

module.exports = router