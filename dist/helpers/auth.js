"use strict";

var helpers = {};

helpers.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'no estas autorizado a ingresar..debes hacer login!');
  res.redirect('/users/login');
};

helpers.isNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/users/login');
};

module.exports = helpers;