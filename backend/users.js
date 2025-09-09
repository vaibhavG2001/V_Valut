let mongoose = require("mongoose")
mongoose.connect("mongodb+srv://vaibhavkashyap872_db_user:vgthescube@cluster0.ii998ma.mongodb.net/").then(() => {
    console.log("Connected...")
}).catch((err) => {
    console.log("not connected")
})


const dataschema = mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    age: Number,
    password: String,
    uploadImg: [String]
})


module.exports = mongoose.model("images", dataschema)