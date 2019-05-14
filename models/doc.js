const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const docSchema = new Schema({
  ref: String,
  type: String,
  status: {
    type: String,
    default: 'draft',
  },
  data: {
    clientId: {
      type: ObjectId,
      ref: 'Client',
      default: undefined,
    },
    client: {
      name: String,
      cif: String,
      address: {
        street: String,
        number: Number,
        postalCode: Number,
        country: String,
      }
    },
    items: [{
      item: String,
      units: Number,
      priceUnit: Number,
    }]
  }
}, {
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
  });

const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;