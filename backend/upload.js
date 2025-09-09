const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("./cloudinary")



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
         resourceType :"auto",
        folder: "user_folder",
        // allowed_formats:["jpg","png","jpeg","webp"].yh lagaguna nhi vrna vo or formats wali chize add nhi krne dega
    }
})


const upload=multer({storage:storage})
module.exports=upload