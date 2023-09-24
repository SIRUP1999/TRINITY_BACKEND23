const StudentRegisteration = require('../Model/Register')
const Register = {
  register: require('../Model/RegisterStudent.json'),
  setRegister: function (data) {
    this.register = data
  },
}

const path = require('path')
const fspromises = require('fs').promises
const fs = require('fs')

const getAllStudents = async (req, res) => {
  // const students = await StudentRegisteration.find().lean().exec()
  if (!Register.register.length) return res.send('no student found')
  // if (!students.length) return res.status(400).send('No User Found')
  res.status(201).json(Register.register)
}

const createNewStudent = async (req, res) => {
  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ message: 'No image uploaded' })
  }
  const ImageFile = req.files.avatar
  const data = `uploads/${ImageFile.name}`
  ImageFile.mv(`Public/${data}`)
  const uploadsID = Date.now().toString()

  const uploadsEntry = {
    id: uploadsID,
    fileName: data,
    filePath: `Public/${data}`,
  }
  const jsonData = JSON.parse(req.body.jsondata)

  const {
    student_id,
    firstname,
    Surname,
    Gender,
    Date_Of_Birth,
    Place_Of_Birth,
    Mother_Tongue,
    Religion_And_Denomination,
    Ghanaian_Language_Spoken,
    Home_Town,
    Nationality,
    Region,
    Year_In_Which_Admission_Is_Sought,

    Name_Of_School,
    Admittion_details,
    Last_Attendance_Date,
    How_Did_You_Hear_About_Trinity_Christian_Mission_School,
    What_Are_Your_Reasons_For_Leaving_Your_Previous_School,

    Both_Parents,
    Mother,
    Father,
    Other_Person,
    Guardian,

    Older_Children,
    Younger_Children,

    Details_Of_Persons_Relationship_To_The_Child_Living_with,

    fathers_Firstname,
    fathers_surname,
    fathers_Occupation,
    fathers_Nationality,
    fathers_Education_level,

    fathers_Religion,
    fathers_Name_And_Adress_Of_Place_Of_Work,
    fathers_Home_Address,

    fathers_Tel_Number_Office,
    fathers_Tel_Number_Mobile,

    fathers_Email_Address,
    fathers_Number_Of_Wifes,
    fathers_If_Deceased_State_Date_Of_Death,

    Smallpox,
    Diptheria,
    Whooping_Cou,
    Teta,
    Measles,
    Polio,
    Tuberculosis,
    Futher_details_About_the_Childs_Health,
    In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done,
    Mother_Firstname,
    Mother_surname,
    Mother_Occupation,
    Mother_Nationality,
    Mother_Education_level,

    Mother_Religion,
    Mother_Name_And_Address_Of_Place_Of_Work,
    Mother_Home_Adress,

    Mother_Tel_Number_Office,
    Mother_Tel_Number_Mobile,

    Mother_Email_Address,
    Mother_If_Deceased_State_Date_Of_Death,

    Guardian_Firstname,
    Guardian_surname,
    Guardian_Occupation,
    Guardian_Nationality,
    Guardian_Education_level,
    Guardian_Religion,
    Guardian_Name_And_Address_Of_Place_Of_Work,
    Guardian_Home_Address,

    Guardian_Tel_Number_Office,
    Guardian_Tel_Number_Mobile,

    Guardian_Email_Address,
    Guardian_Number_Of_Wifes,
    Parents_or_guardian_signature,
    ParentsignedBy,
    correspondence_No,
    Admission,
    Date_For_Receipt_Of_Admission_Form,

    Birth_CertificateI,
    Birth_CertificateC,
    Health_CertificateI,
    Health_CertificateC,
    Two_Passport_Size_PhotographsI,
    Two_Passport_Size_PhotographsC,
    Returned_Signed_Declaration_FormsI,
    Returned_Signed_Declaration_FormsC,
    headmaster_Signature,
    head_Teacher_signed_by,
    Comment,
  } = jsonData
  // const duplicate = await StudentRegisteration.findById(id).exec()
  const duplicate = Register.register.find(
    (person) => person.student_id === student_id
  )
  if (duplicate) return res.status(409).send('Student already exist')

  const newStudent = {
    student_id: Register.register.length
      ? Register.register[Register.register.length - 1].student_id + 1
      : 1,
    photo: uploadsEntry,
    firstname,
    Surname,
    Gender,
    Date_Of_Birth,
    Place_Of_Birth,
    Mother_Tongue,
    Religion_And_Denomination,
    Ghanaian_Language_Spoken,
    Home_Town,
    Nationality,
    Region,
    Year_In_Which_Admission_Is_Sought,

    Name_Of_School,
    Admittion_details,
    Last_Attendance_Date,
    How_Did_You_Hear_About_Trinity_Christian_Mission_School,
    What_Are_Your_Reasons_For_Leaving_Your_Previous_School,

    Both_Parents,
    Mother,
    Father,
    Other_Person,
    Guardian,

    Older_Children,
    Younger_Children,

    Details_Of_Persons_Relationship_To_The_Child_Living_with,

    fathers_Firstname,
    fathers_surname,
    fathers_Occupation,
    fathers_Nationality,
    fathers_Education_level,

    fathers_Religion,
    fathers_Name_And_Adress_Of_Place_Of_Work,
    fathers_Home_Address,

    fathers_Tel_Number_Office,
    fathers_Tel_Number_Mobile,

    fathers_Email_Address,
    fathers_Number_Of_Wifes,
    fathers_If_Deceased_State_Date_Of_Death,

    Smallpox,
    Diptheria,
    Whooping_Cou,
    Teta,
    Measles,
    Polio,
    Tuberculosis,
    Futher_details_About_the_Childs_Health,
    In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done,
    Mother_Firstname,
    Mother_surname,
    Mother_Occupation,
    Mother_Nationality,
    Mother_Education_level,

    Mother_Religion,
    Mother_Name_And_Address_Of_Place_Of_Work,
    Mother_Home_Adress,

    Mother_Tel_Number_Office,
    Mother_Tel_Number_Mobile,

    Mother_Email_Address,
    Mother_If_Deceased_State_Date_Of_Death,

    Guardian_Firstname,
    Guardian_surname,
    Guardian_Occupation,
    Guardian_Nationality,
    Guardian_Education_level,
    Guardian_Religion,
    Guardian_Name_And_Address_Of_Place_Of_Work,
    Guardian_Home_Address,

    Guardian_Tel_Number_Office,
    Guardian_Tel_Number_Mobile,

    Guardian_Email_Address,
    Guardian_Number_Of_Wifes,
    Parents_or_guardian_signature,
    ParentsignedBy,
    correspondence_No,
    Admission,
    Date_For_Receipt_Of_Admission_Form,

    Birth_CertificateI,
    Birth_CertificateC,
    Health_CertificateI,
    Health_CertificateC,
    Two_Passport_Size_PhotographsI,
    Two_Passport_Size_PhotographsC,
    Returned_Signed_Declaration_FormsI,
    Returned_Signed_Declaration_FormsC,
    headmaster_Signature,
    head_Teacher_signed_by,
    Comment,
  }

  // await StudentRegisteration.create(newStudent)
  try {
    const oldStudents = Register.register.filter(
      (person) => person.firstname !== duplicate
    )
    const newUser = [...oldStudents, newStudent]
    Register.setRegister(newUser)

    await fspromises.writeFile(
      path.join(__dirname, '..', 'Model', 'RegisterStudent.json'),
      JSON.stringify(Register.register)
    )
  } catch (err) {
    console.log(err)
  }
  res.status(201).json({ message: 'Student Registered successfully!' })
}

const UpdateStudent = async (req, res) => {
  // const Student = await StudentRegisteration.findById(id).exec()
  // if (!Student) return res.sendStatus(403) //forbidden
  // const foundStudent = await StudentRegisteration.findOne({ FullName })
  // if (!foundStudent)
  //   return res.status(400).json({ message: 'no student found' })
  const idtoUpdate = req.params.id
  consoe.log(idtoUpdate)
  const {
    id,
    firstname,
    Surname,
    Gender,
    Date_Of_Birth,
    Place_Of_Birth,
    Mother_Tongue,
    Religion_And_Denomination,
    Ghanaian_Language_Spoken,
    Home_Town,
    Nationality,
    Region,
    Year_In_Which_Admission_Is_Sought,

    Name_Of_School,
    Admittion_details,
    Last_Attendance_Date,
    How_Did_You_Hear_About_Trinity_Christian_Mission_School,
    What_Are_Your_Reasons_For_Leaving_Your_Previous_School,

    Both_Parents,
    Mother,
    Father,
    Other_Person,
    Guardian,

    Older_Children,
    Younger_Children,

    Details_Of_Persons_Relationship_To_The_Child_Living_with,

    fathers_Firstname,
    fathers_surname,
    fathers_Occupation,
    fathers_Nationality,
    fathers_Education_level,

    fathers_Religion,
    fathers_Name_And_Adress_Of_Place_Of_Work,
    fathers_Home_Address,

    fathers_Tel_Number_Office,
    fathers_Tel_Number_Mobile,

    fathers_Email_Address,
    fathers_Number_Of_Wifes,
    fathers_If_Deceased_State_Date_Of_Death,

    Smallpox,
    Diptheria,
    Whooping_Cou,
    Teta,
    Measles,
    Polio,
    Tuberculosis,
    Further_details_About_the_Childs_Health,
    In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done,
    Mother_Firstname,
    Mother_surname,
    Mother_Occupation,
    Mother_Nationality,
    Mother_Education_level,

    Mother_Religion,
    Mother_Name_And_Address_Of_Place_Of_Work,
    Mother_Home_Adress,

    Mother_Tel_Number_Office,
    Mother_Tel_Number_Mobile,

    Mother_Email_Address,
    Mother_If_Deceased_State_Date_Of_Death,

    Guardian_Firstname,
    Guardian_surname,
    Guardian_Occupation,
    Guardian_Nationality,
    Guardian_Education_level,
    Guardian_Religion,
    Guardian_Name_And_Address_Of_Place_Of_Work,
    Guardian_Home_Address,

    Guardian_Tel_Number_Office,
    Guardian_Tel_Number_Mobile,

    Guardian_Email_Address,
    Guardian_Number_Of_Wifes,
    Parents_or_guardian_signature,
    ParentsignedBy,
    correspondence_No,
    Admission,
    Date_For_Receipt_Of_Admission_Form,

    Birth_CertificateI,
    Birth_CertificateC,
    Health_CertificateI,
    Health_CertificateC,
    Two_Passport_Size_PhotographsI,
    Two_Passport_Size_PhotographsC,
    Returned_Signed_Declaration_FormsI,
    Returned_Signed_Declaration_FormsC,
    headmaster_Signature,
    head_Teacher_signed_by,
    Comment,
  } = req.body
  const Student = Register.register.find((person) => person.student_id === id)
  const updatedStudent = () => {
    if (Student) {
      return (
        (Student.firstname = firstname),
        (Student.Surname = Surname),
        (Student.Gender = Gender),
        (Student.Date_Of_Birth = Date_Of_Birth),
        (Student.Place_Of_Birth = Place_Of_Birth),
        (Student.Mother_Tongue = Mother_Tongue),
        (Student.Religion_And_Denomination = Religion_And_Denomination),
        (Student.Ghanaian_Language_Spoken = Ghanaian_Language_Spoken),
        (Student.Home_Town = Home_Town),
        (Student.Nationality = Nationality),
        (Student.Region = Region),
        (Student.Year_In_Which_Admission_Is_Sought =
          Year_In_Which_Admission_Is_Sought),
        (Student.Name_Of_School = Name_Of_School),
        (Student.Admittion_details = Admittion_details),
        (Student.Last_Attendance_Date = Last_Attendance_Date),
        (Student.How_Did_You_Hear_About_Trinity_Christian_Mission_School =
          How_Did_You_Hear_About_Trinity_Christian_Mission_School),
        (Student.What_Are_Your_Reasons_For_Leaving_Your_Previous_School =
          What_Are_Your_Reasons_For_Leaving_Your_Previous_School),
        (Student.Both_Parents = Both_Parents),
        (Student.Mother = Mother),
        (Student.Father = Father),
        (Student.Other_Person = Other_Person),
        (Student.Guardian = Guardian),
        (Student.Older_Children = Older_Children),
        (Student.Younger_Children = Younger_Children),
        (Student.Details_Of_Persons_Relationship_To_The_Child_Living_with =
          Details_Of_Persons_Relationship_To_The_Child_Living_with),
        (Student.fathers_Firstname = fathers_Firstname),
        (Student.fathers_surname = fathers_surname),
        (Student.fathers_Occupation = fathers_Occupation),
        (Student.fathers_Nationality = fathers_Nationality),
        (Student.fathers_Education_level = fathers_Education_level),
        (Student.fathers_Religion = fathers_Religion),
        (Student.fathers_Name_And_Adress_Of_Place_Of_Work =
          fathers_Name_And_Adress_Of_Place_Of_Work),
        (Student.fathers_Home_Address = fathers_Home_Address),
        (Student.fathers_Tel_Number_Office = fathers_Tel_Number_Office),
        (Student.fathers_Tel_Number_Mobile = fathers_Tel_Number_Mobile),
        (Student.fathers_Email_Address = fathers_Email_Address),
        (Student.fathers_Number_Of_Wifes = fathers_Number_Of_Wifes),
        (Student.fathers_If_Deceased_State_Date_Of_Death =
          fathers_If_Deceased_State_Date_Of_Death),
        (Student.Smallpox = Smallpox),
        (Student.Diptheria = Diptheria),
        (Student.Whooping_Cou = Whooping_Cou),
        (Student.Teta = Teta),
        (Student.Measles = Measles),
        (Student.Polio = Polio),
        (Student.Tuberculosis = Tuberculosis),
        (Student.ther_details_About_the_Childs_Health =
          Further_details_About_the_Childs_Health),
        (Student.In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done =
          In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done),
        (Student.Mother_Firstname = Mother_Firstname),
        (Student.Mother_surname = Mother_surname),
        (Student.Mother_Occupation = Mother_Occupation),
        (Student.Mother_Nationality = Mother_Nationality),
        (Student.Mother_Education_level = Mother_Education_level),
        (Student.Mother_Religion = Mother_Religion),
        (Student.Mother_Name_And_Address_Of_Place_Of_Work =
          Mother_Name_And_Address_Of_Place_Of_Work),
        (Student.Mother_Home_Adress = Mother_Home_Adress),
        (Student.Mother_Tel_Number_Office = Mother_Tel_Number_Office),
        (Student.Mother_Tel_Number_Mobile = Mother_Tel_Number_Mobile),
        (Student.Mother_Email_Address = Mother_Email_Address),
        (Student.Mother_If_Deceased_State_Date_Of_Death =
          Mother_If_Deceased_State_Date_Of_Death),
        (Student.Guardian_Firstname = Guardian_Firstname),
        (Student.Guardian_surname = Guardian_surname),
        (Student.Guardian_Occupation = Guardian_Occupation),
        (Student.Guardian_Nationality = Guardian_Nationality),
        (Student.Guardian_Education_level = Guardian_Education_level),
        (Student.Guardian_Religion = Guardian_Religion),
        (Student.Guardian_Name_And_Address_Of_Place_Of_Work =
          Guardian_Name_And_Address_Of_Place_Of_Work),
        (Student.Guardian_Home_Address = Guardian_Home_Address),
        (Student.Guardian_Tel_Number_Office = Guardian_Tel_Number_Office),
        (Student.Guardian_Tel_Number_Mobile = Guardian_Tel_Number_Mobile),
        (Student.Guardian_Email_Address = Guardian_Email_Address),
        (Student.Guardian_Number_Of_Wifes = Guardian_Number_Of_Wifes),
        (Student.Parents_or_guardian_signature = Parents_or_guardian_signature),
        (Student.ParentsignedBy = ParentsignedBy),
        (Student.correspondence_No = correspondence_No),
        (Student.Admission = Admission),
        (Student.Date_For_Receipt_Of_Admission_Form =
          Date_For_Receipt_Of_Admission_Form),
        (Student.Birth_CertificateI = Birth_CertificateI),
        (Student.Birth_CertificatBirth_CertificateC = Birth_CertificateC),
        (Student.Health_CertificateI = Health_CertificateI),
        (Student.Health_CertificateC = Health_CertificateC),
        (Student.Two_Passport_Size_PhotographsI =
          Two_Passport_Size_PhotographsI),
        (Student.Two_Passport_Size_PhotographsC =
          Two_Passport_Size_PhotographsC),
        (Student.Returned_Signed_Declaration_FormsI =
          Returned_Signed_Declaration_FormsI),
        (Student.Returned_Signed_Declaration_FormsC =
          Returned_Signed_Declaration_FormsC),
        (Student.headmaster_Signature = headmaster_Signature),
        (Student.head_Teacher_signed_by = head_Teacher_signed_by),
        (Student.Comment = Comment)
      )
    }
    return Student
  }
  const oldeStudents = Register.register.filter(
    (person) => person.student_id !== id
  )

  const unsortedArray = [...oldeStudents, updatedStudent]
  // await StudentRegisteration.save()
  Register.setRegister(
    unsortedArray.sort((a, b) =>
      a.student_id > b.student_id ? 1 : a.student_id < b.student_id ? -1 : 0
    )
  )
  await fspromises.writeFile(
    (path.join(__dirname, '..', 'Model', 'RegisterStudent.json'),
    JSON.stringify(Register.register))
  )

  res.json({ message: 'Student Updated successfully' })
}

const deleteStudent = async (req, res) => {
  // const { id } = req.body
  // const deletedStudent = await StudentRegisteration.findById(id).exec()
  // if (!deletedStudent) return res.send('check your id please')
  // await deletedStudent.deleteOne()
  const { id } = req.body
  console.log(id)
  const student = Register.register.find((person) => person.student_id === id)
  if (!student) return res.json('no user found')
  const otherUsers = Register.register.filter(
    (person) => person.student_id !== id
  )
  Register.setRegister(otherUsers)
  await fspromises.writeFile(
    path.join(__dirname, '..', 'Model', 'RegisterStudent.json'),
    JSON.stringify(Register.register)
  )
  res.status(200).json(`Student was deleted sucessfully`)
}

module.exports = {
  getAllStudents,
  createNewStudent,
  UpdateStudent,
  deleteStudent,
}
