const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Register = require('./Register')
const FeedsSchema = new mongoose.Schema(
  {
    Student_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: Register,
    },
    student_name: String,
    Received_From: String,
    The_Sum_Of: String,
    Being: String,
    GHC: Number,
    Balance: Number,
    Signature: String,
    Receipt_Cheque_No: Number,
  },
  {
    timestamps: true,
  }
)

FeedsSchema.plugin(AutoIncrement, {
  id: 'Cheque_No',
  inc_field: 'Receipt_Cheque_No',
  start_seq: 100,
  disable_hooks: 'true',
})
module.exports = mongoose.model('Fee', FeedsSchema)
