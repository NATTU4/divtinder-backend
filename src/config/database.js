const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Nataraj:E0XCDPP1flUaLO76@cluster0.kiove.mongodb.net/devTinder"
    );
} ;


module.exports = connectDB;