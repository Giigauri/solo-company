const config = require('../config')

module.exports = function(email, token) {
    return{
        to: email,
        from: config.EMAIL_FROM,
        subject: 'პაროლის აღდგენა',
        html: `
            <h1>SOLO: დაგავიწყდა პაროლი?</h1>
            <p>თუ გახსოვთ მაშინ გაატარეთ ეს წერილი</p>
            <p>სხვა შემთხვევაში გადადით <a href="${config.BASE_URL}/auth/password/${token}">მითითებულ ბმულზე</a></p>
            </hr>
            <a href="${config.BASE_URL}">SOLO</a>
        `
    }
}
