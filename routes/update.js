const {Router} = require('express')
const registration = require('../models/regmodel')
const router = Router()

router.get('/:id', async (req, res) => {
    const users = await registration.findById(req.params.id)
    const status = [ 
                        { id: 1, title: 'სტუდენტი' },
                        { id: 2, title: 'მასწავლებელი' },
                        { id: 3, title: 'დირექტორი' }
    ]
    
    const gender = [ 
        { id: 1, title: 'მამრობითი' },
        { id: 2, title: 'მდედრობითი' }
    ] 

    res.render('update', {
        users: users,
        config: {
            gender,
            status
        }
    })
})


module.exports = router