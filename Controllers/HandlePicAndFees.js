// const TermlyFee = {
//   Fee: require('../Model/FeesTermly.json'),
//   setTermly: function (data) {
//     this.Fee = data
//   },
// }

// const fspromises = require('fs').promises
// const path = require('path')

// const handleFeesGet = async (req, res) => {
//   res.status(200).json(TermlyFee.Fee)
// }
// const handleFeesPost = async (req, res) => {
//   const { TermlyFees } = req.body
//   if (!TermlyFees) return res.status(404).json({ message: 'No request found' })

//   const newFee = {
//     TermlyFee,
//   }
//   TermlyFee.setTermly(newFee)
//   await fspromises.writeFile(
//     path.join(__dirname, '..', 'Model', 'FeesTermly.json'),
//     JSON.stringify(TermlyFee.Fee)
//   )

//   res.status(201).json({ message: 'New Fees set sucessfully' })
// }
// const DeleteTerrmly = (req, res) => {
//   const { id } = req.body

//   if (!TermlyFees) return res.status(404).json({ message: 'no Fee to delete' })

//   const findFee = TermlyFee.Fee.filter((fee) => fee.id !== id)
// }

// module.exports = {
//   handleFeesGet,
// }
