const express = require("express")
const app = express()
const schema = require("./users")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { middleware, AdminMiddleware } = require("./middleware")




const path = require("path")

const nodemailer = require("nodemailer")




//////////////////
const upload = require("./upload")
//////////////////


require("dotenv").config()
app.use(express.json())
app.use(cookieParser())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// app.use(express.urlencoded({ extended: true }))
const allowedOrigins = [
  "http://localhost:3000",
  "https://v-valut-2.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools (Postman)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.post("/registration", async (req, res) => {
    try {

        let { name, email, number, age, password } = req.body
        // console.log(req.body)

        if (name && email && number && age && password) {
            let emailFind = await schema.findOne({ email: email })
            let numberFind = await schema.findOne({ number: number })


            if (emailFind || numberFind) {
                return res.status(400).send("User Already Exists!")
            }


            else {
                let hashedpassword = await bcrypt.hash(password, 10)
                let create = await schema.create({
                    name: name,
                    email: email,
                    number: number,
                    age: age,
                    password: hashedpassword
                })




                return res.status(200).send("Succussfully register")

            }
        }




        else {
            res.status(400).send("Enter All Inputs First!")
        }
    }


    catch (err) {
        res.status(500).send("Internal Server Error!")
    }
})



app.post("/login", async (req, res) => {
    try {

        let { email, password } = req.body;

        if (email && password) {


            let find = await schema.findOne({ email: email })

            if (!find) {
                return res.status(400).send("User not found")
            }



            let compare = await bcrypt.compare(password, find.password)



            if (compare) {

                let token = jwt.sign(
                    { email: find.email, id: find._id },
                    process.env.SECRET_KEY,
                    { "expiresIn": "1h" }
                )


                res.cookie("LoginCookie", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                })


                return res.status(200).send("Successfully login!")
            }

            else {
                return res.status(400).send("Password is incorrect!")
            }





        }



        else {
            return res.status(400).send("Enter Both Inputs!")
        }







    }

    catch (err) {
        return res.status(500).send("Internal server error!")
    }
})








app.post("/dashboard", middleware, upload.single("file"), async (req, res) => {
    try {

        let { id } = req.user
        // console.log(id)
        let find = await schema.findOne({ _id: id })

        if (find) {
            if (!find.uploadImg.includes(req.file.path)) {
                let { uploadImg } = find

                let update = await schema.findOneAndUpdate(
                    { email: find.email },
                    { $push: { uploadImg: `${req.file.path}` } },
                    { new: true }
                )


                return res.status(200).json({
                    imgArray: update.uploadImg,
                    msg: "Successfully uploaded!",
                    public_id: req.file.filename
                })
            }


            else {
                return res.status(400).send("file already Exists")
            }



        }

        else {
            return res.status(400).send("user not found!")
        }


    }

    catch (err) {
        return res.status(400).send("Dashboard Error!")
    }
})



app.get("/showcards", middleware, async (req, res) => {
    try {
        let { id } = req.user
        let find = await schema.findOne({ _id: id })
        if (find) {
            res.status(200).json({
                imgarray: find.uploadImg,
                name: find.name
            })
        }
        else {
            console.log("no")
        }

    }
    catch (err) {
        return res.status(400).send("Showcards Error!")
    }
})




app.post("/adminlogin", async (req, res) => {
    try {


        let adminInfo = {
            email: "vaibhavk@gmail.com",
            password: "red"
        }


        let { email, password } = req.body

        if (email && password) {

            if (email == adminInfo.email && password == adminInfo.password) {

                let token = jwt.sign(
                    { email },
                    process.env.SECRET_KEY,
                    { "expiresIn": "1h" }
                )


                res.cookie("adminCookie", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                })

                return res.status(200).send("Welcome admin")
            }
            else {
                return res.status(400).send("Incorrect Details!")
            }

        }

        else {
            return res.status(400).send("Enter Both Inputs First!")
        }


    }

    catch (err) {
        return res.status(500).send("Internal server Error!")
    }

})


// .Fetch all user in admin area
app.get("/adminarea", AdminMiddleware, async (req, res) => {
    // console.log("check")
    try {

        let all_user = await schema.find({}, { password: 0 })
        res.status(200).json({
            allUser: all_user
        })
    }

    catch (err) {
        return res.status(400).send("Error")
    }
})



app.get("/check", AdminMiddleware, (req, res) => {
    // res.send("djsnake")
})




app.post("/deleteuser", async (req, res) => {
    try {

        let { id } = req.body
        let personFind = await schema.findOne({ _id: id })

        let node = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vaibhavkashyap872@gmail.com",
                pass: "kvcu onrv odah fupg"
            }
        })


        let find = await schema.find()

        let options = {
            from: "vaibhavkashyap872@gmail.com",
            to: `${personFind.email}`,
            text: "Admin Deleted your Account!",
            subject: "Account Information"
        }


        node.sendMail(options, (err, info) => {
            if (err) {
                console.log("Error..", err)
            }
            else {
                console.log(`Email send to ${personFind.name}`, info.response)
            }
        })

        let mainUser = await schema.deleteOne({ _id: id })


        return res.status(200).json({
            alluser: find,
            msg: "Successfully deleted user!"
        });
    }


    catch (err) {
        return res.status(500).send("Internal server error")
    }
})



app.get("/logoutAdmin", (req, res) => {
    // let token = req.cookies.adminCookie
    res.clearCookie("adminCookie", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })


    res.status(200).send("Cookie Deleted")

})



















app.listen(5000, () => { })


