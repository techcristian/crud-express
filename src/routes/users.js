const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');
const helpers = require('../helpers/auth');

//ruta a formulario de login
router.get('/users/login', (req, res) => {
    res.render('users/login')
});
// ruta desde el formulario de login
router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
}));


//ruta a formulario de registro
router.get('/users/register', (req, res) => {
    res.render('users/register');
});

//ruta desde formulario de registro
router.post('/users/register', async(req, res) => {
    console.log(req.body);
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'por favor ingresa un nombre' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'por favor ingrese un email' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'los password no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'password debe ser mayor a 4 carateres' });
    }
    if (errors.length > 0) {
        res.render('users/register', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', ' el email ingresado ya se encuentra en uso,ingresa otro por favor!!');
            res.redirect('/users/register');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'ya estas registrado, muchas gracias por unirte a nuetra app de notas');
        res.redirect('/users/login');
    }

});

router.get('/users/logout', helpers.isNotAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



module.exports = router;