"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var Note = require('../models/Note');

var _require = require('../helpers/auth'),
    isAuthenticated = _require.isAuthenticated;

router.get('/notes/add', isAuthenticated, function (req, res) {
  res.render('notes/new-note');
});
router.post('/notes/new-note', isAuthenticated, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, description, errors, newNote;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, title = _req$body.title, description = _req$body.description;
            errors = [];

            if (!title) {
              errors.push({
                text: 'please insert a title'
              });
            }

            if (!description) {
              errors.push({
                text: 'please insert a description'
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 9;
              break;
            }

            res.render('notes/new-note', {
              errors: errors,
              title: title,
              description: description
            });
            _context.next = 15;
            break;

          case 9:
            newNote = new Note({
              title: title,
              description: description
            });
            newNote.user = req.user.id;
            _context.next = 13;
            return newNote.save();

          case 13:
            req.flash('success_msg', 'Nota guardada exitosamente');
            res.redirect('/notes');

          case 15:
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
router.get('/notes', isAuthenticated, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Note.find({
              user: req.user.id
            }).sort({
              date: 'desc'
            }).then(function (documentos) {
              var contexto = {
                notes: documentos.map(function (documento) {
                  return {
                    title: documento.title,
                    description: documento.description,
                    id: documento.id
                  };
                })
              };
              res.render('notes/all-notes', {
                notes: contexto.notes
              });
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //ruta hacia el form de editar nota

router.get('/notes/edit/:id', isAuthenticated, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var note, nada;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Note.findById(req.params.id);

          case 2:
            note = _context3.sent;
            nada = Object.assign({}, note);
            res.render('notes/edit-note', {
              nada: nada
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //ruta que viene del form desde donde le pasamos los datos para editar

router.put('/notes/edit-note/:id', isAuthenticated, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, title, description;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context4.next = 3;
            return Note.findByIdAndUpdate(req.params.id, {
              title: title,
              description: description
            });

          case 3:
            req.flash('success_msg', 'nota editada exitosamente');
            res.redirect('/notes');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // ruta que borra notas

router["delete"]('/notes/delete/:id', isAuthenticated, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Note.findByIdAndDelete(req.params.id);

          case 2:
            req.flash('success_msg', 'Nota borrada exitosamente');
            res.redirect('/notes');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;