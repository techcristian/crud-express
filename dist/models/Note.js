"use strict";

var mongoose = require('mongoose');

var User = require('./User');

var Schema = mongoose.Schema;
var NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  user: {
    type: String
  }
});
module.exports = mongoose.model('Note', NoteSchema);