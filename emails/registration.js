const config = require('../config')

module.exports = function(email) {
        return{
            to: email,
            from: config.EMAIL_FROM,
            subject: "რეგისტრაცია წარმატებით დასრულდა",
            html: `
                <h1>SOLO</h1>
                <p>გილოცავთ! თქვენ წარმატებით დარეგისტრირდით - ${email}</p>
                </hr>
                <a href="${config.BASE_URL}">SOLO</a>
            `
        }
}