import { Router } from "express";
import UserService from "../service/UsersService.js";
import { Strategy as LocalStategy } from 'passport-local';
import passport from "passport";

const userLoginRoutes = Router()
const userService = new UserService()


passport.use('login', new LocalStategy({ passReqToCallback: true }, async (username, password, done) => {
    const authenticated = await userService.authenticate(username, password)
    if (authenticated) {
        return done(null, username)
    } else {
        return done("Error en login", false)
    }
}))

passport.use('register', new LocalStategy({ passReqToCallback: true }, async (username, password, done) => {

    try {
        await userService.register(username, password)
        done(null, username)

    } catch (error) {
        done("Error register")
    }

}))

// passport.serializeUser((user, done) => {

//     done(null, user.username)

// })

// passport.deserializeUser(async (username, done) => {

// //  TODO: Implementar en userService el metodo para obtener un usuario directamente de la bd 
// const username = 


// })

userLoginRoutes.use(passport.initialize())
userLoginRoutes.use(passport.session())

async function authenticateSession(req, res, next) {
    const authenticated = await userService.authenticate(req.session.username, req.session.password)
    if (!authenticated) {
        return res.render('ejs/error.ejs', { error: "Credenciales invalidos" })
    }
    req.session.cookie = { maxAge: 360000 }
    next()
}


userLoginRoutes.get('/login', (req, res) => {
    res.render('ejs/login.ejs')
})

userLoginRoutes.post('/login', async (req, res) => {

    const { username, password } = req.body
    const authenticated = await userService.authenticate(username, password)
    if (!authenticated) {
        return res.render('ejs/error.ejs', { error: "Credenciales invalidos" })
    }
    req.session.username = username
    req.session.password = password
    res.redirect('/productos')

})


userLoginRoutes.get('/productos', authenticateSession, (req, res) => {
    const data = { name: req.session.username }

    res.render('ejs/ingresoProducto.ejs', { data })
})

userLoginRoutes.post('/register', async (req, res) => {
    const { username, password } = req.body
    if (req.session.username) {
        return res.render('ejs/error.ejs', { error: "Usuario registrado en sesion" })
    } else {

        await userService.register(username, password)
        res.redirect('/login')
    }
})

userLoginRoutes.get('/register', (req, res) => {
    res.render('ejs/register.ejs')
})

userLoginRoutes.get('/logout', (req, res) => {

    const data = { username: req.session.username || "" }
    req.session.destroy(error => { error ? res.render('ejs/error.ejs', { error: "Error al eliminar sesion " + error }) : res.render('ejs/logout.ejs', { data }) })
})

export default userLoginRoutes