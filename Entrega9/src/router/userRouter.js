import { Router } from "express";
import UserService from "../service/UsersService.js";
const userLoginRoutes = Router()
const userService = new UserService()




async function authenticateSession(req, res, next) {
    const authenticated = await userService.authenticate(req.session.username, req.session.password)
    if (!authenticated) {
        return res.render('ejs/error.ejs', { error: "Credenciales invalidos" })
    }
    req.session
    next()
}


userLoginRoutes.get('/login', (req, res) => {
    res.render('ejs/login.ejs')
})

userLoginRoutes.post('/login', async (req, res) => {

    const { username, password } = req.body
    console.log(username)
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

    const { username } = req.session.username || ""

    req.session.destroy(error => { error ? res.render('ejs/logout.ejs', username) : res.render('ejs/error.ejs', { error: "Error al eliminar sesion" }) })


})

export default userLoginRoutes