import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connect } from './config.js'
import { braRoute } from './routing/branchRouter.js'
import { stuRouting } from './routing/StudentRouter.js'
import { staffRouting } from './routing/staffRouter.js'
import { registerRouting } from './routing/registerRouter.js'

dotenv.config()
connect();

const app = express()
const port = process.env.PORT || 8000

app.use('/upload', express.static('upload'));
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/upload', express.static('upload'))  // ✅ fixed path

app.use('/', registerRouting)
app.use('/api', braRoute)
app.use('/api', stuRouting)
app.use('/api', staffRouting)

app.get('/', (req, res) => {
  res.send("HABIBY! Welcome to MMIT Aligarh")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
