const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const companySchema = new Schema({
  admin: ObjectId,
  users: [{ type: ObjectId, ref: 'User' }],
  admin: ObjectId,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;