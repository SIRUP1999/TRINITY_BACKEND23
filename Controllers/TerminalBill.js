const TerminalBill = {
  terminalBill: require('../Model/TerminalBill.json'),
  setTerminalBill: function (data) {
    this.TerminalBill = data
  },
}

const path = require('path')
const fspromises = require('fs').promises

const GetTerminalBill = (req, res) => {
  res.json(TerminalBill.terminalBill)
}

const CreateTerminalBill = async (req, res) => {
  const { Basic } = req.body
  let terminalbillsfixed
  if (Basic === 'CRECHE') {
    terminalbillsfixed = {
      tuition_fee: 130,
      p_t_a_dues: 10,
      toiletries: 50,
      maintenance_fee: 15,
      disposable_spoons: 10,
      examination_fees: 10,
      first_aid: 4,
      Basic: Basic,
    }
  } else if (Basic === 'NURSERY') {
    terminalbillsfixed = {
      tuition_fee: 110,
      p_t_a_dues: 10,
      toiletries: 50,
      maintenance_fee: 15,
      disposable_spoons: 10,
      examination_fees: 10,
      first_aid: 4,
      Basic: Basic,
    }
  } else if (Basic === 'PRIMARY') {
    terminalbillsfixed = {
      tuition_fee: 120,
      p_t_a_dues: 10,

      toiletries: 30,
      stationary: 15,
      disposable_spoons: 10,
      examination_fees: 15,
      first_aid: 4,
      Basic: Basic,
    }
  } else if (Basic === 'KG') {
    terminalbillsfixed = {
      tuition_fee: 110,
      p_t_a_dues: 10,
      toiletries: 40,
      maintenance_fee: 15,
      disposable_spoons: 10,
      examination_fees: 15,
      first_aid: 4,
      Basic: Basic,
    }
  }

  // const GetBill = [terminalbillsfixed, Total]
  // TerminalBill.setTerminalBill(GetBill)

  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'TerminalBill.json'),
    JSON.stringify(terminalbillsfixed)
  )
  res.json({ message: 'Bill Created' })
}

module.exports = {
  GetTerminalBill,
  CreateTerminalBill,
}
