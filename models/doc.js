const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  ref: String,
  type: String,
  status: String,
  data:{
    client:{
      name:String,
      nif:String,
      address:{
        street:String,
        number:Number,
        postalCode:Number,
        country:String,
      }
    },
    items:[{
      item:String,
      units:Number,
      priceUnit:Number,
    }]
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
});

const User = mongoose.model('Doc', docSchema);

module.exports = User;