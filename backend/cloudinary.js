const cloudinary=require("cloudinary").v2
require("dotenv").config()

cloudinary.config({
    cloud_name:process.env.Cloud_name,
    api_key:process.env.Api_key,
    api_secret:process.env.Api_secret
})

module.exports=cloudinary