const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const ejs = require('ejs')
const session = require('express-session')
const csrf = require('csurf')
const flash = require('connect-flash')
const MongoStorage = require('connect-mongodb-session')(session)
const expressLayouts = require('express-ejs-layouts')
const config = require('./config')
const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const teamRoutes = require('./routes/team')
const priceRoutes = require('./routes/price')
const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const usersRoutes = require('./routes/users')
const updateRoutes = require('./routes/update')
const updateSaveRoutes = require('./routes/updateSave')
const deleteRoutes = require('./routes/delete')


const notFoundRoutes = require('./routes/notFound')
const varMiddleware = require('./middleware/variables')
const fileMiddleware = require('./middleware/file')


const app = express()


const store = new MongoStorage({
    collection: 'Active',
    uri: config.URL
})


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: config.SESION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(fileMiddleware.single('photo'))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/team', teamRoutes)
app.use('/price', priceRoutes)
app.use('/auth', authRoutes)
app.use('/course', courseRoutes)
app.use('/users', usersRoutes)
app.use('/users', updateRoutes)
app.use('/updatesave', updateSaveRoutes)
app.use('/delete', deleteRoutes)

app.use('*', notFoundRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(config.URL, 
                                {useNewUrlParser: true, 
                                useFindAndModify: false, 
                                useUnifiedTopology: true })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()