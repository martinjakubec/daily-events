const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    customId: {type: Number, unique: true},
    title: {type: String},
    text: {type: String},
    date: {type: Date},
    author: {type: String},
    hasBeenApproved: {type: Boolean}
  },
  {collection: 'events'}
);

const model = mongoose.model('EventSchema', EventSchema);

module.exports = model;
