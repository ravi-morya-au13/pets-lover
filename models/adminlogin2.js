const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    bookname: String,
    bookdes: String,

})
const Bookdata = new mongoose.model("petdata", adminSchema)
module.exports = Bookdata