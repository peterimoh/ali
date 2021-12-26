const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;
const planSchema = new Schema(
  {
    recieptStatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      trim: true,
    },
    depositDate: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    user_id: [{ type: ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
