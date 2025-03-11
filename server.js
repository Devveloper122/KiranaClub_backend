const express = require("express");
const DBConnection = require('./config/mongoDB.js');
const jobRoutes = require("./routes/jobRoutes.js");
require('dotenv').config();

const app = express();

app.use(express.json());
DBConnection();

const port = process.env.port || 3000;


app.use('/api', jobRoutes);

app.listen(3000, ()=>{
    console.log(`server up and listening... at port ${port}`);
});