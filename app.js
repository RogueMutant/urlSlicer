require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./db/connect')
const routes = require('./routes/urlroutes')
const notFoundError = require('./middleware/notFound')

app.use(express.static('./static'))
app.use(express.json())
app.use('/urlSlicer', routes)
app.use(notFoundError)

const port = process.env.PORT || 5000

const start = async ()=>{
    try {
        await connectDb(process.env.DATABASE_URI)
        app.listen(port, console.log(`connected to Db 😁😁😁, listening on port ${port}....`))
    } catch (error) {
        console.log(error,'Couldn"t connect to DB 😭😭');
    }
}
start()