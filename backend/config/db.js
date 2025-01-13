const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, useUnifiedTopology: true
        }).then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('MongoDB connection error: ', err));
    }catch(error){
        console.error('Error connecting to mongoDB', error);
        process.exit(1);
    }
}

module.exports = connectDB;