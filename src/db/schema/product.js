const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  currency: String,
  categories:Array
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;