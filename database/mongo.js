const mongoose = require("mongoose");
require('dotenv').config()
function dbConnect(){
    
    mongoose.connect(process.env.MONGODB_URI )
    .then(() => console.log('Connected to Mongo!'))
    .catch(()=>console.log('Not Connected to Mongo!'));
    
}
exports.dbConnect = dbConnect;