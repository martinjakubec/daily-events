const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    role: {type: String, enum: ['admin', 'editor', 'user']},
    eventsSeen: [Number],
    eventsCreated: [Number],
  },
  {collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
