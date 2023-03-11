import { Router } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import UserService from "../services/userService";

const loginRoutes = Router();
const userServices = new UserService();

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true },
    async (username, password, done) => {
      const authenticaded = await userServices.authenticaded(
        username,
        password
      );
      if (authenticaded) {
        return done(null, username);
      } else {
        return done("Error en Login", false);
      }
    }
  )
);

loginRoutes.use(passport.initialize())
loginRoutes.use(passport.session())

loginRoutes.get("/", (req, res) => {});

loginRoutes.post('/login',passport.authenticate("local",{successRedirect:'/api/productos',failureRedirect:'/'}))

loginRoutes.get("/signup", (req, res) => {});

loginRoutes.post("/signup", (req, res) => {
  const { username, name, number, photo, age, email } = req.body;
  try{
    res.redirect("/");
  } catch(Error){
    res.redirect("/signup");
  }

  
});

loginRoutes.get("/logout", (req, res) => {
  req.session.destroy((error) => res.redirect("/"));
});
