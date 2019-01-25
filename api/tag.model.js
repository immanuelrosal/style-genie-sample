const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Tag = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'tags'
});

module.exports = mongoose.model('Tag', Tag);