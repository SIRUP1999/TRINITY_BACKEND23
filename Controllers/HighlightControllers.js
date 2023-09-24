const Fees = {
  fees: require('../Model/Fees.json'),
  setFees: function (Data) {
    this.fees = Data
  },
}

const UpdateFee = async (req, res) => {
  const id = req.params.id
  const { update3 } = req.body
  const findupdate = Fees.fees.find((fee) => {
    fee.student_id === id
  })
  console.log(findupdate)
  console.log(id)
  //   console.log(Fees.fees)
  //   const check2 = findupdate.find((fee) => {
  //     fee.student_id === id
  //   })

  //   if (check2) {
  //     check2.update2 === update3
  //   }
}

module.exports = UpdateFee
