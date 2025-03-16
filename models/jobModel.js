// 1). creating jobSchema using mongoose:

const mongoose = require("mongoose");

// Image Schema, initially stores only the URL:
const imageSchema = new mongoose.Schema({
    // Image URL
    url: { 
        type: String, 
        required: true 
    },  

    // Will be updated asynchronously
    width: { type: Number, default: null }, 
    height: { type: Number, default: null }, 
    perimeter: { type: Number, default: null }, 
    error: { type: String, default: null } 
});

const visitSchema = new mongoose.Schema({
    store_id: {
        type: String,
        required: true,
    },
    images: {
        type: [imageSchema],
        required: true
    },
    visit_time: {
        type: String,
        required: true
    },
});

const jobSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    visits: {
        type: [visitSchema],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },

     // Error array containing objects with store_id and error message
     errors: [
        {
            store_id: { type: String, required: true },
            error: { type: String, required: true }
        }
    ]
});


const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
