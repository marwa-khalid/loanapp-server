
const Loan = require("../models/Loan");
const router = require("express").Router();

router.post('/', async (req, res) => {  
    try {
        const { name, email, phoneNumber, loan } = req.body;
        console.log(req.body)
            const LoanDetails = new Loan({
              name, email, phoneNumber, loan
            });

            await LoanDetails.save();

            res.status(201).json({ message: 'Loan request sent successfully.' });
        
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
  try {

    const loan = await Loan.find();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan requests' });
  }
});

module.exports = router;