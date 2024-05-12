require('dotenv').config()
const connectDB = require('./db/connect')
const Url = require('./models/url')


const nukeDb = async()=>{
    try {
        await connectDB(process.env.DATABASE_URI)
        await Url.deleteMany()
        console.log('succesfully nuked the Database')
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

nukeDb()