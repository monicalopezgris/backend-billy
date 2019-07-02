const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: String,
  password: String,
  clients: [{
    type: ObjectId,
    ref: 'Client',
  }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;