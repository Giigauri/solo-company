const multer = require('multer')
const randomBytes = require('random-bytes')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/course_upload_img')
    },
    async filename(req, file, cb) {
        const strArr = file.originalname.split('.')
        const format = strArr[ strArr.length - 1 ]
        randomBytes(12, async(err, buffer) => {
            if(err) {
                return false
            }

            const dinamicStr = buffer.toString('hex')
            const dinamicFileName = `${dinamicStr}.${format}`
            cb(null, dinamicFileName)
        })
       
    }
})




const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


module.exports = multer({
    storage, fileFilter
})