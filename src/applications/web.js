import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'
import excelRouter from '../routes/excel.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api/excel', excelRouter)

app.use(errorMiddleware)

export default app
