// step1  import mongoose library
const mongoose = require ('mongoose');

// step2  write async function to connect database with node
const connectDB = async ()=> {
    try{

        // step3 actual connection to mongodb
        // mongoose.connect takes 2 arguments second is for using latest features
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,     //  new URL string parser
            useUnifiedTopology: true   //  new server discovery engine

        });
        console.log("MongoDB connected")

    }
    catch (err){
        console.error("MongoDB connection error :", err.message);
        process.exit(1);

    }
};

// step4 exporting the function to be used in server.js
module.exports = connectDB;


// step 1 database connection done