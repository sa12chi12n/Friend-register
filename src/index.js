const express = require("express")
app = express()
port = 8000
const path = require("path")
const bcrypt = require("bcrypt")
const hbs = require("hbs")
require("./db/connection")
const Sadata = require("./module/schema")




const htmlpath = path.join(__dirname, "../public")
const partialspath = path.join(__dirname, "../partial")
app.use(express.static(htmlpath))
app.use(express.urlencoded({ extended: false }))
hbs.registerPartials(partialspath)
app.set("view engine", "hbs")



app.get("/", (req, res) => {
    res.render("index")
})
app.get("/registation", (req, res) => {
    res.render("registation")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async(req, res) => {
   try {
    const email = req.body.email
    const password = req.body.password
const find = await Sadata.findOne({email:email})
const comp = await bcrypt.compare(password,find.password)
if(comp){
    res.status(201).render("mainfile")

}else{
    res.render("404page")
}
   } catch (error) {
    res.status(400).send("invalid email")
   }
})


app.post("/registation", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;



        if (password === cpassword) {
            const alldata = new Sadata({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                number: req.body.number,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
                checkbox: req.body.checkbox
            })
         
       const allsasa = await alldata.save();
            res.status(201).render("mainfile")

        } else {
            res.render("404page")

        }
    } catch (error) {
        res.send("err")
    }
})





app.listen(port, () => {
    console.log("succes")
})



