import multer from 'multer'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = 'storage/uploads'

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    cb(null, path)
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const filename = `${uuid()}.${ext}`

    cb(null, filename)
  },
})

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true)
  } else {
    cb('Please upload only excel file', false)
  }
}

const upload = multer({ storage, fileFilter: excelFilter })

export default upload
