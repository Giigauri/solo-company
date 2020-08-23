const {Router} = require('express')
const bcrypt = require('bcryptjs')
const randomBytes = require('random-bytes')
const registration = require('../models/regmodel')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const config = require('../config')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')
const router = Router()

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: config.SENDGRID_API_KEY}
}))

router.get('/registration', (req, res) => {
    res.render('auth/registration', {
        title: 'რეგისტრაცია',
        error: req.flash('error'),
        activeNav: 'registration'
    })
})

router.post('/registration', async (req, res) => {
    try{
        const {email, password} = req.body
        const candidate = await registration.findOne({ email })

        if(candidate) {
            req.flash('error', 'აღნიშნული ელ-ფოსტა უკვე გამოყენებულია')
            res.redirect('/auth/registration')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const icon = (req.body.gender == 1) ? "male" : "female"
                const regmodel = new registration({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                status: req.body.status,
                gender: req.body.gender,
                email: req.body.email,
                password: hashPassword,
                photo: req.file.filename,
                icon
            })

            await regmodel.save()
            await transporter.sendMail(regEmail(req.body.email))
            res.redirect('/?status=success')
        }

    } catch (e) {
        console.log(e)
    }
})


router.get('/login', (req, res) => {
    res.render('auth/auth', {
        title: 'ავტორიზაცია',
        error: req.flash('error'),
        activeNav: 'auth'
    })
})

router.post('/login', async (req, res) => {
   
    const user = registration.findOne({ email: req.body.email }).exec()
    .then( async (doc) => { 
        const areSame = await bcrypt.compare(req.body.password, doc.password)
        if(areSame) {
            req.session.user = doc
            req.session.isAuthenticated = true
            res.redirect('/')
        } else {
            req.flash('error', 'მითითებული პაროლი არასწორია')
            res.redirect('/auth/login')
        }   
    }) 

    .catch((err) => {
        req.flash('error', 'მითითებული ელ.ფოსტა არ არსებობს')
        res.redirect('/auth/login')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy( () => {
        res.redirect('/')
    })  
})

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'პაროლის აღდგენა',
        error: req.flash('error'),
    })
})

router.post('/reset', async (req, res) => {
    try{
        randomBytes(12, async (err, buffer) => {
            if(err) {
                // ერორი  ! ! !
                return res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex')
            const candidate = await registration.findOne({email: req.body.email})

            if(candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await transporter.sendMail(resetEmail(candidate.email, token))
                req.flash('error', 'უნიკალური კოდი გამოგზავნილია')
                res.redirect('/auth/reset')
            } else{
                req.flash('error', 'მითითებული ელ.ფოსტა ვერ მოიძებნა')
                res.redirect('/auth/reset')
            }

        })

    } catch (e) {
        console.log(e)
    }
})

router.post('/checkemail/:email', async (req, res) => {
    const check = await registration.findOne({email: req.params.email})
    res.end((check) ? `{"find":"yes"}` : `{"find":"no"}`)
})


router.get('/password/:token', async (req, res) => {
    if(!req.params.token) {
        return res.redirect('/auth/login')
    }

    try {
        const user = await registration.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if(!user) {
            return res.redirect('/auth/login')
        } else {
                res.render('auth/updatePass', {
                title: 'პაროლის აღდგენა',
                userId: user._id.toString(),
                token: req.params.token
            })
        }
        
    } catch(e) {
        console.log(e)
    }
})

router.post('/password', async (req, res) => {
    try{
        const user = await registration.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if(user) {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = null
            user.resetTokenExp = null
            await user.save()
            res.redirect('/auth/login')
        } else { 
            res.redirect('/auth/login')
        }
        
    } catch (e) {
        console.log(e)
    }
})

module.exports = router