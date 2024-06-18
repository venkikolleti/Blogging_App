const mongoose = require('mongoose');
const MONGO_URI = "mongodb://localhost:27017/iBlogger"
const connectToMongo = ()=>{
    mongoose.connect(MONGO_URI)
}
module.exports=connectToMongo