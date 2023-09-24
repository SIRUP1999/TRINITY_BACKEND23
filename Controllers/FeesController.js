// const Fees = require('../Model/Fees')
const Fees = {
  fees: require('../Model/Fees.json'),
  setFees: function (data) {
    this.fees = data
  },
}
const Register = {
  register: require('../Model/RegisterStudent.json'),
  setRegister: function (data) {
    this.register = data
  },
}

// const schedule = require('node-schedule')

// const students = [
//   { id: 1, name: 'Alice', fees: 100, arrears: 0 },
//   { id: 2, name: 'bob', fees: 200, arrears: 0 },
// ]
// const fs = require('fs')
// const dueDate = new Date('2023-08-21')
// const rule = new schedule.RecurrenceRule()
// rule.hour = 5
// rule.minute = 22

// const ScheduleTime = schedule.scheduleJob(rule, () => {
//   const newThing = Fees.fees.forEach((student) => {
//     if (student.GHC > 0 && dueDate > new Date()) {
//       student.arrears2 += student.GHC
//       student.GHC = 0
//     }
//   })

//   console.log('scheduled task executed')
// })
// console.log(ScheduleTime)
// const io = require('../server')

// const zlib = require('zlib')

const fspromises = require('fs').promises
const path = require('path')
//

const getAllFees = async (req, res) => {
  // const StudentFS = await Fees.find().lean().exec()
  res.status(201).json(Fees.fees)

  // getIoInstance.emit('fees', { message: 'fees' })
  // io.emit('message', { message: 'hello one two three' })

  // if (!StudentFS.length) return res.status(400).send('No fees Found')
  // res.status(200).json(StudentFS)
}

const CreateFees = async (req, res) => {
  const {
    student_id,
    student_name,
    student_class,
    term,
    totalfee,
    Received_From,
    // arrears,
    last_payment_made,
    Being,
    GHC,
    Signature,
    Receipt_Cheque_No,
  } = req.body

  // if (
  //   !student_name ||
  //   !Received_From ||
  //   !The_Sum_Of ||
  //   !Being ||
  //   !GHC ||
  //   !Signature ||
  //   // !Receipt_Cheque_No
  // )
  //   return res.status(403).json({ message: 'All fields Are Required' })

  // const duplicate = await Fees.findOne({ student_name })
  //   .collation({ locale: 'en', strength: 2 })
  //   .lean()
  //   .exec()
  // if (duplicate)
  //   return res.status(403).json({
  //     message:
  //       'duplicate Student,please be careful,this place is about finances',
  //   })

  // const duplicate = Fees.fees.find((fee) => fee.id === id)
  // if (duplicate) return res.sendStatus(403) //forbidden
  // const fees = await Fees.create({
  //   student_name,
  //   Received_From,
  //   The_Sum_Of,
  //   Being,
  //   GHC,
  //   Balance,
  //   Signature,
  // })
  // if (fees) {
  //   res.status(200).json({
  //     message:
  //       'Fees Record Created SucessFully,please keep your ID safe for future reference',
  //   })
  // } else {
  //   res.status(200).json({
  //     message: 'Something Went Wrong',
  //   })
  // }

  const duplicate = Fees.fees.find(
    (fee) => fee.Receipt_Cheque_No === Receipt_Cheque_No
  )
  if (duplicate) return res.sendStatus(409)
  // const compress = zlib.deflateSync(Buffer.from(Signature)).toString('base64')

  const termdescriptioncut1 = term.slice(0, 3)
  const termdescriptioncut2 = term.slice(4, 8)
  const getyearinnum = Number(termdescriptioncut2)

  //alot

  const getthings = Fees.fees.filter(
    (fee) =>
      (fee.student_id === student_id &&
        fee.termdescriptioncut1 < termdescriptioncut1 &&
        fee.getyearinnum <= getyearinnum) ||
      (fee.student_id === student_id &&
        fee.termdescriptioncut1 > termdescriptioncut1 &&
        fee.getyearinnum <= getyearinnum) ||
      (fee.student_id === student_id &&
        fee.termdescriptioncut1 === termdescriptioncut1 &&
        fee.getyearinnum <= getyearinnum)
  )
  // const getBalance = getthings.filter((person) => person.Balance > 0)

  // const getBalancetotal = getBalance.reduce(
  //   (acc, curr) => acc + curr.Balance,
  //   0
  // )

  let people
  const getBalance2 = getthings.filter((person) => {
    people = person.Balance
  })
  console.log(people)

  // console.log(getthings.)
  // const getthings2 = Fees.fees.filter(
  //   (fee) =>
  //     (fee.student_id === student_id &&
  //       fee.termdescriptioncut1 < termdescriptioncut1 &&
  //       getyearinnum >= fee.getyearinnum) ||
  //     (fee.student_id === student_id &&
  //       fee.termdescriptioncut1 > termdescriptioncut1 &&
  //       getyearinnum >= fee.getyearinnum) ||
  //     (fee.student_id === student_id &&
  //       fee.termdescriptioncut1 === termdescriptioncut1 &&
  //       getyearinnum >= fee.getyearinnum)
  // )
  // if (getthings2.Balance > 0) {
  //   res.json({
  //     Message: `Student ID ${getBalancetotal.student_id} Has a Balance and his balance has been added to his current school fees `,
  //   })
  //   console.log(
  //     `Student ID ${getBalancetotal.student_id} Has a Balance and his balance has been added to his current school fees `
  //   )
  // }
  // const getArrearsTotal = getBalance.reduce(
  //   (acc, curr) => acc + curr.arrears2,
  //   0
  // )s
  //alot ENDS

  let Totalfee
  let arrears3
  if (people > 0) {
    Totalfee = Number(totalfee) + people
    arrears3 = `GHC ${people}`
  } else if (people < 0) {
    Totalfee = Number(totalfee) + people

    arrears3 = ` Last Term Balance of GHC ${people} Deducted From  Current Fees`
  } else {
    Totalfee = Number(totalfee)
    arrears3 = `GHC ${0}`
  }
  const Ghc = Number(GHC)
  // const totalpayment= Fees.fees.filter((fee)=>fee.student_id === student_id )
  const registeredIDS = Register.register.find(
    (id) => id.student_id === student_id
  )
  if (!registeredIDS)
    return res.STATUS(403).json({
      message: `No Registered Student With an ID: ${student_id}  found`,
    })

  const newFee = {
    student_id,
    student_id2: student_id,
    student_class,
    student_name,
    term,
    Totalfee,
    Received_From,
    last_payment_made,
    Being,
    Ghc,
    arrears2: arrears3,
    Signature,
    Receipt_Cheque_No,
    total_payment_made: Ghc,
    Balance: Totalfee - Ghc,
    update2: true,
    termdescriptioncut1,
    getyearinnum,
  }

  const io = req.app.get('io')
  let count = 1
  io.emit('newmessage', { message: newFee })
  io.emit('notification', count++)

  // Fees.watch().on('change', (change) => {
  //   if (change.OperationType === 'insert') {
  //     const newMessage = change.fullDocument
  //     io.emit('newonetime', newMessage)
  //   }
  // })

  const oldFees = Fees.fees.filter(
    (fees) => fees.Receipt_Cheque_No !== Receipt_Cheque_No
  )
  const newFees = [...oldFees, newFee]

  Fees.setFees(newFees)
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'Fees.json'),
    JSON.stringify(Fees.fees)
  )

  res.status(201).json({ message: 'fees created' })
}

const UpdateFees = async (req, res) => {
  const id = req.params.id
  // console.log(id)
  const {
    // studentname,
    // student_class,
    Received_From,
    last_payment_made,
    Being,
    GHC,
    // arrears,
    Signature,
    update2,
    update3,
    Term,
  } = req.body
  // const term2 = req.params.term2
  // const { update3 } = req.body
  // const { id2, update3 } = req.bodyconst term
  // const { update3 } = req.body
  // console.log(update3)
  // console.log(arrears)
  // const StudentFs = await Fees.findById(id).exec()
  // console.log(toString(id))
  // if (!StudentFs)
  //   return res.status(403).json({ message: 'No User With Such An Id' })
  // const gethighlight = Fees.fees.filter((person) => {
  //   person.student_id === id && person.term === term
  // })
  // console.log(gethighlight)
  // const arrears2 = Number(arrears)s
  const Ghc = Number(GHC)
  // console.log(Ghc)
  // console.log(GHC)
  const filterterm = Fees.fees.filter((fee) => fee.term === Term)
  console.log(filterterm)
  console.log(Term)
  const findStudent = filterterm.find((fee) => fee.student_id === id)
  console.log(findStudent)
  if (!findStudent)
    return res.status(403).json({ message: 'No USER WITH SUCH AN ID ' })
  let totalpayment = findStudent.total_payment_made + Number(GHC)
  // if (student_class) findStudent.student_class = student_class
  // if (arrears) findStudent.arrears2 = arrears2
  // if (studentname) findStudent.student_name = studentname
  if (Received_From) findStudent.Received_From = Received_From
  if (last_payment_made) findStudent.last_payment_made = last_payment_made
  if (Being) findStudent.Being = Being
  if (GHC) findStudent.Ghc = GHC
  if (Signature) findStudent.Signature = Signature
  if (totalpayment) findStudent.total_payment_made = totalpayment
  if (totalpayment) findStudent.Balance = findStudent.Totalfee - totalpayment
  if (update2 === true) findStudent.update2 = true
  if (update3 === false && Term === findStudent.term)
    findStudent.update2 = update3

  const io = req.app.get('io')
  //  const noti = update2 === true? io.emit('newUpdate',findStudent.student_id)
  if (update2 === true) {
    io.emit('newUpdate', findStudent.student_id)
  }
  const otherStudents = Fees.fees.filter(
    (fee) => fee.Receipt_Cheque_No !== findStudent.Receipt_Cheque_No
  )
  // const dueDate = new Date('2023-08-22')
  // const rule = new schedule.RecurrenceRule()
  // rule.hour = 22
  // rule.minute = 57

  // const ScheduleTime = schedule.scheduleJob(rule, () => {
  //   Fees.fees.forEach((student) => {
  //     if (student.GHC > 0 && dueDate > new Date()) {
  //       student.arrears2 += student.GHC
  //       student.GHC = 0
  //     } else {
  //       delete student.GHC
  //     }
  //   })
  //   console.log('schedule executed')
  // })
  // console.log(ScheduleTime)

  ///socket
  // io.on('connection', (socket) => {
  //   console.log(socket.id)
  //   socket.emit('newUpdate', { message: id })
  //   socket.on('disconnect', () => {
  //     console.log('client disconnected')
  //   })
  // })

  const UnsortedArray = [...otherStudents, findStudent]
  Fees.setFees(
    UnsortedArray.sort((a, b) =>
      a.student_id > b.student_id ? 1 : a.student_id < b.student_id ? -1 : 0
    )
  )
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'Fees.json'),
    JSON.stringify(Fees.fees)
  )
  res.status(201).json({ message: 'fee updated sucessfully' })
  // await StudentFs.save()
  // res
  //   .status(200)
  //   .json({ message: `student ${student_name}  fees Record updated` })
}

const deleteFeess = async (req, res) => {
  const { id } = req.body
  const StudentFs = await Fees.findById(id).exec()

  if (!StudentFs)
    return res.status(400).json({ message: 'no Student with this ID' })
  await StudentFs.deleteOne()

  res
    .status(200)
    .json({ message: `student  wit ID ${StudentFs._id} deleted sucessfully` })
}
module.exports = {
  getAllFees,
  CreateFees,
  UpdateFees,
  deleteFeess,
}
