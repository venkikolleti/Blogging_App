const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
connectToMongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/blogs',require('./routes/blogs'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})