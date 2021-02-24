const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    customId: {type: Number, unique: true},
    title: {type: String},
    text: {type: String},
    dateAdded: {type: Date},
    dateToBeShown: {type: String},
    author: {type: String},
    hasBeenApproved: {type: Boolean},
    hasBeenGloballyShown: {type: Boolean}
  },
  {collection: 'events'}
);

const model = mongoose.model('EventSchema', EventSchema);

module.exports = model;
