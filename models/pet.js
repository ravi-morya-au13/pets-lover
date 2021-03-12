const mongoose = require("mongoose");
const PetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    petname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    vaccinated: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    breeds:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    petprice:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Pets', PetSchema);


