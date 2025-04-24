import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from './config.js'
import { braRoute } from './routing/branchRouter.js'
import { stuRouting } from './routing/StudentRouter.js'
import { staffRouting } from './routing/staffRouter.js'

dotenv.config()
connect();

const app = express()
const port = process.env.Port || 8000


app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use('./upload', express.static('upload'));

app.use('/api', braRoute)
app.use('/api', stuRouting)
app.use('/api', staffRouting);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})