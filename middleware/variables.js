module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.csrf = req.csrfToken()
    res.locals.activeNav = false
    res.locals.success = false
    res.locals.success_course = false
    res.locals.use_pagination = false
    next()
}