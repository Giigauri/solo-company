const {Router} = require('express')
const registration = require('../models/regmodel')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
    const regUsers = await registration.find()
    const status = [ 
        { id: 1, title: 'სტუდენტი' },
        { id: 2, title: 'მასწავლებელი' },
        { id: 3, title: 'დირექტორი' }
    ] 
    const gender = [ 
        { id: 1, title: 'მამრობითი' },
        { id: 2, title: 'მდედრობითი' }
    ]

    res.render('users', {
        users: regUsers,
        success: false,
        activeNav: 'users',
        config: {
            gender,
            status
        }
    })
})

module.exports = router