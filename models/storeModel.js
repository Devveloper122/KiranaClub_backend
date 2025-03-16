// 2).
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    StoreID: { 
        type: String, 
        required: true, 
        unique: true
    },
    AreaCode: {
        type: Number,
        required: true
    },
    StoreName: {
        type: String,
        required: true
    }
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
