const mongoose = require("mongoose")
const usersSchema = new mongoose.Schema({
    username: String,
    password: String,


});
const Admindata = new mongoose.model("Admindata", usersSchema);
module.exports = Admindata