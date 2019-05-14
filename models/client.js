const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  cif: String,
  address: {
    street: String,
    number: Number,
    postalCode: Number,
    country: String,
  }
}, {
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
  });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;