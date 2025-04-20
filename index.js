import express from 'express'
import {data} from './data.js'
const app = express()
const router = express.Router()
const port = 3000

const login = ((req, resp,next) => {
  const { username } = req.body
  if (username) {
    console.log('user name hai ',username);
  }

  resp.status(200)
    .json({
      success:true,
      username,
      auther: "ravi karan",
      data
    })

})

router.post('/',login);
router.get('/',login);
app.use(express.json())
app.use('/api',router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})