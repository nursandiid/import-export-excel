import express from 'express'
import excelController from '../controllers/excel.controller.js'
import upload from '../middleware/upload.middleware.js'

const excelRouter = express.Router()

excelRouter.post('/upload', upload.single('file'), excelController.upload)
excelRouter.get('/users', excelController.getAll)
excelRouter.get('/download', excelController.download)

export default excelRouter
