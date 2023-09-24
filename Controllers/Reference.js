const Reference = {
  reference: require('../Model/Reference.json'),
  setReference: function (data) {
    this.reference = data
  },
}

const shortid = require('shortid')
const path = require('path')
const fspromises = require('fs').promises

const GetReference = (req, res) => {
  res.status(201).json(Reference.reference)
}

const CreateReference = async (req, res) => {
  const { id, student_id, term, Received_From, student_name, GHC } = req.body

  if (!GHC) return res.sendStatus(403)
  const duplicate = Reference.reference.find((ref) => ref.id === id)
  if (duplicate) return res.status(409).json({ message: 'duplicate' }) //conflict

  const otherReferences = Reference.reference.filter((ref) => ref.id !== id)

  const newRef = {
    id: shortid.generate().slice(0, 5),
    student_id,
    student_name,
    Payment_made_by: Received_From,
    GHC,
    term,
    Date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }

  const references1 = [...otherReferences, newRef]

  Reference.setReference(references1)
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'Reference.json'),
    JSON.stringify(Reference.reference)
  )
  res.status(201).json({ message: 'New Reference Stored' })
}

const DeleteReferemnce = async (req, res) => {
  const { id } = req.body
  console.log(id)
  if (!id) return res.sendStatus(403) //forbidden
  const findUser = Reference.reference.find((ref) => ref.id === id)
  if (!findUser) return res.sendStatus(404) //bad request

  const otherUsers = Reference.reference.filter((ref) => ref.id !== id)
  Reference.setReference(otherUsers)
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'Reference.json'),
    JSON.stringify(Reference.reference)
  )
  res.status(201).json('sucess')
}

module.exports = {
  GetReference,
  CreateReference,
  DeleteReferemnce,
}
