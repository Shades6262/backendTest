const mongoose = require('mongoose')

const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully cuh')
    }catch(err){
        console.log('Error, Couldnt connect to Database innit ',err)
    }
}

module.exports = connectDB;