const {Router} = require('express')
const courseModel = require('../models/courseModel')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, async (req, res) => {
    const allCourses = await courseModel.find()
    const pages = Math.ceil(allCourses.length / 3)
    const visiblePages = (pages > 5) ? 5 : pages
    const regCourses = await courseModel.find().limit(3)
    const success_course = (req.query.course_status) ? true : false
    res.render('addCourse', {
        title: 'კურსის დამატება',
        error: req.flash('error'),
        success_course: success_course,
        use_pagination: true,
        activeNav: 'course',
        courses: regCourses,
        visiblePages: visiblePages,
        pages: pages
    })
})


router.post('/', async (req, res) => {
    const course = new courseModel({
        header_name: req.body.header_name,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        photo: req.file.filename
    })

    await course.save()
    res.redirect('/course?course_status=success_course')
})

router.post('/pagination/:page', async (req, res) => {
    const skip = (req.params.page - 1) * 3
    const regCourses = await courseModel.find().skip(skip).limit(3)
    res.end(JSON.stringify(regCourses))
})


module.exports = router