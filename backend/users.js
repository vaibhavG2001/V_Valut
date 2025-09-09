let mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase").then(() => {
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