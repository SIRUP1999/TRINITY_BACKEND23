const FeesAndTerm = {
  feesandterm: require('../Model/HandleFeesAndTerm.json'),
  setFeesAndTerm: function (data) {
    this.feesandterm = data
  },
}

const path = require('path')
const fspromises = require('fs').promises
const shortid = require('shortid')

const getFeesAndTerm = (req, res) => {
  res.status(201).json(FeesAndTerm.feesandterm)
}

const CreateFeesAndTerm = async (req, res) => {
  const { id, Term } = req.body

  if (!Term) return res.status(404).json({ message: 'Term is required' })

  const newData = {
    id: shortid.generate(),
    Term,
  }
  //   const oldyears = FeesAndTerm.feesandterm.filter((fee) => fee.id !== id)
  //   const newTerm = [...oldyears, newData]

  FeesAndTerm.setFeesAndTerm(newData)
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'HandleFeesAndTerm.json'),
    JSON.stringify(FeesAndTerm.feesandterm)
  )
  console.log(FeesAndTerm.feesandterm)
}

module.exports = {
  getFeesAndTerm,
  CreateFeesAndTerm,
}
