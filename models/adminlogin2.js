const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    petname:String,
    age:String,
    vaccinated:String,
    trained:String,
    category:String,
    breeds:String,
    location:String,
    color:String,
    description:String

})
const petdata = new mongoose.model("petdatadata", adminSchema)
module.exports = petdata