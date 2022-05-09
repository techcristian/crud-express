"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var User = require('../models/User');

var passport = require('passport');

var helpers = require('../helpers/auth'); //ruta a formulario de login


router.get('/users/login', function (req, res) {
  res.render('users/login');
}); // ruta desde el formulario de login

router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/login',
  failureFlash: true
})); //ruta a formulario de registro

router.get('/users/register', function (req, res) {
  res.render('users/register');
}); //ruta desde formulario de registro

router.post('/users/register', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, email, password, confirm_password, errors, emailUser, newUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password;
            errors = [];

            if (name.length <= 0) {
              errors.push({
                text: 'por favor ingresa un nombre'
              });
            }

            if (email.length <= 0) {
              errors.push({
                text: 'por favor ingrese un email'
              });
            }

            if (password != confirm_password) {
              errors.push({
                text: 'los password no coinciden'
              });
            }

            if (password.length < 4) {
              errors.push({
                text: 'password debe ser mayor a 4 carateres'
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 11;
              break;
            }

            res.render('users/register', {
              errors: errors,
              name: name,
              email: email,
              password: password,
              confirm_password: confirm_password
            });
            _context.next = 23;
            break;

          case 11:
            _context.next = 13;
            return User.findOne({
              email: email
            });

          case 13:
            emailUser = _context.sent;

            if (emailUser) {
              req.flash('error_msg', ' el email ingresado ya se encuentra en uso,ingresa otro por favor!!');
              res.redirect('/users/register');
            }

            newUser = new User({
              name: name,
              email: email,
              password: password
            });
            _context.next = 18;
            return newUser.encryptPassword(password);

          case 18:
            newUser.password = _context.sent;
            _context.next = 21;
            return newUser.save();

          case 21:
            req.flash('success_msg', 'ya estas registrado, muchas gracias por unirte a nuetra app de notas');
            res.redirect('/users/login');

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/users/logout', helpers.isNotAuthenticated, function (req, res) {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;