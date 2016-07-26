var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//grocery schema
var grocerySchema = new Schema ({
  name: String,
  quantity: Number,
  edit: Boolean
});

var grocery = mongoose.model('Groceries', grocerySchema);

module.exports = grocery;
