const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRouter)

app.listen(3007, () => {
    console.log('Api server is running...');
})