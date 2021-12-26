const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  cardName: {
    type: String,
    required: true,
    default: '',
  },
  cardNumber: {
    type: String,
    required: true,
    default: '',
  },
  cardExpired: {
    type: String,
    required: true,
    default: '',
  },
  cardCvv: {
    type: String,
    required: true,
    default: '',
  },
});

const addressSchema = new Schema({
  receiver: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  addressType: {
    type: String,
  },
  isDefault: {
    type: Boolean,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      index: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      max: 20,
    },
    profile: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    country: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    state: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    zipCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    card: [cardSchema],
    billingAddress: [addressSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
