const jwt = require("jsonwebtoken")


function middleware(req, res, next) {

    let { LoginCookie } = req.cookies

    if (!LoginCookie) {
        // return res.redirect("/login")
        return res.status(404).send("Login Cookie is not found!")
    }

    jwt.verify(LoginCookie, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(400).send("Invalid or Expire Token!")
        }

        req.user = decode
        next()
    })


}

function AdminMiddleware(req, res, next) {
    let { adminCookie } = req.cookies

    if (!adminCookie) {
        return res.status(400).send("Login First")
    }

    jwt.verify(adminCookie, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(400).send("Invalid or expire token")
        }
        req.user = decode,
            next()
    })
}



module.exports = { middleware, AdminMiddleware }