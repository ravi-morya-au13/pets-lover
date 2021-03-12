const mongoose = require("mongoose");

const URI = "mongodb+srv://ravimorya4:<Reset@123>@cluster0.hqicu.mongodb.net/Petlovers?retryWrites=true&w=majority";
const connectDB = async () => {
    await mongoose.connect(URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    console.log('db connected')
}
module.exports = connectDB;
