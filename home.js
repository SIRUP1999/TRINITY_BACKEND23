const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

//set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    //save the file with the current timestamp as the filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  },
})
// initialise multer with the storage engine
const upload = multer({ storage: storage })
// serve static files from the upload directory
app.use(express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded')
  }

  // get the url of the uploaded image
  const ImageUrl = req.file.path
  res.send({ ImageUrl })
})
