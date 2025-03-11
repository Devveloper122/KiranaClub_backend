const mongoose = require("mongoose");

const connectDB = async () =>{

    mongoose.connection.on('connected', ()=>{
        console.log('database connected.');
    });

    await mongoose.connect(`${process.env.DB_URL}/KiranaClub`);
};

module.exports = connectDB;