const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
      type: String

    },
    
    phoneNumber: {
      type: String
    },
    loan: {
      type: Number
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan" , LoanSchema);