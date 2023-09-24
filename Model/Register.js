const mongoose = require('mongoose')

const StudentRegisteration = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    Surname: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },

    Date_Of_Birth: {
      type: String,
      required: true,
    },
    Place_Of_Birth: {
      type: String,
      required: true,
    },
    Mother_Tongue: String,
    Religion_And_Denomination: String,
    Ghanaian_Language_Spoken: String,
    Home_Town: String,
    Nationality: String,
    Region: String,
    Year_In_Which_Admission_Is_Sought: Number,

    Name_Of_School: String,
    Admittion_details: String,
    Last_Attendance_Date: Date,
    How_Did_You_Hear_About_Trinity_Christian_Mission_School: String,
    What_Are_Your_Reasons_For_Leaving_Your_Previous_School: String,

    Both_Parents: {
      type: Boolean,
      default: false,
    },
    Mother: {
      type: Boolean,
      default: false,
    },
    Father: {
      type: Boolean,
      default: false,
    },
    Other_Person: {
      type: Boolean,
      default: false,
    },
    Guardian: {
      type: Boolean,
      default: false,
    },

    Older_Children: Number,
    Younger_Children: Number,

    Details_Of_Persons_Relationship_To_The_Child_Living_with: String,

    fathers_Firstname: {
      type: String,
      required: true,
    },
    fathers_surname: {
      type: String,
      required: true,
    },
    fathers_Occupation: {
      type: String,
      required: true,
    },
    fathers_Nationality: {
      type: String,
      required: true,
    },
    fathers_Education_level: {
      type: String,
      required: true,
    },

    fathers_Religion: String,
    fathers_Name_And_Adress_Of_Place_Of_Work: String,
    fathers_Home_Address: String,

    fathers_Tel_Number_Office: Number,
    fathers_Tel_Number_Mobile: Number,

    fathers_Email_Address: String,
    fathers_Number_Of_Wifes: Number,
    fathers_If_Deceased_State_Date_Of_Death: String,

    Smallpox: {
      type: Boolean,
      default: false,
    },
    Diptheria: {
      type: Boolean,
      default: false,
    },
    Whooping_Cou: {
      type: Boolean,
      default: false,
    },
    Teta: {
      type: Boolean,
      default: false,
    },
    Measles: {
      type: Boolean,
      default: false,
    },
    Polio: {
      type: Boolean,
      default: false,
    },
    Tuberculosis: {
      type: Boolean,
      default: false,
    },
    Further_details_About_the_Childs_Health: String,
    In_Case_Of_Sudden_Illness_At_School_Please_State_What_Should_Be_Done:
      String,

    Mother_Firstname: {
      type: String,
      required: true,
    },
    Mother_surname: {
      type: String,
      required: true,
    },
    Mother_Occupation: {
      type: String,
      required: true,
    },
    Mother_Nationality: {
      type: String,
      required: true,
    },
    Mother_Education_level: {
      type: String,
      required: true,
    },

    Mother_Religion: String,
    Mother_Name_And_Address_Of_Place_Of_Work: String,
    Mother_Home_Adress: String,

    Mother_Tel_Number_Office: Number,
    Mother_Tel_Number_Mobile: Number,

    Mother_Email_Address: String,
    Mother_If_Deceased_State_Date_Of_Death: String,

    Guardian_Firstname: {
      type: String,
    },
    Guardian_surname: {
      type: String,
    },
    Guardian_Occupation: {
      type: String,
    },
    Guardian_Nationality: {
      type: String,
    },
    Guardian_Education_level: {
      type: String,
    },
    Guardian_Religion: String,
    Guardian_Name_And_Address_Of_Place_Of_Work: String,
    Guardian_Home_Address: String,

    Guardian_Tel_Number_Office: Number,
    Guardian_Tel_Number_Mobile: Number,

    Guardian_Email_Address: String,
    Guardian_Number_Of_Wifes: Number,
    Parents_or_guardian_signature: String,
    Date: Date,
    ParentsignedBy: String,
    correspondence_No: Number,
    Admission: Number,
    Date_For_Receipt_Of_Admission_Form: String,

    Birth_CertificateI: {
      type: Boolean,
      default: false,
    },
    Birth_CertificateC: {
      type: Boolean,
      default: false,
    },
    Health_CertificateI: {
      type: Boolean,
      default: false,
    },
    Health_CertificateC: {
      type: Boolean,
      default: false,
    },
    Two_Passport_Size_PhotographsI: {
      type: Boolean,
      default: false,
    },
    Two_Passport_Size_PhotographsC: {
      type: Boolean,
      default: false,
    },
    Returned_Signed_Declaration_FormsI: {
      type: Boolean,
      default: false,
    },
    Returned_Signed_Declaration_FormsC: {
      type: Boolean,
      default: false,
    },
    headmaster_Signature: String,
    head_Teacher_signed_by: String,
    Comment: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Register', StudentRegisteration)
