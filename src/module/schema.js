const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const dataSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    checkbox: {
        type: String,
        required: true
    },
})





dataSchema.pre("save",async function (next){
    try {
        const salt = await bcrypt.genSalt(10)
        const passwordhash = await bcrypt.hash(this.password,salt)
        const cpassword = await bcrypt.hash(this.password,salt)
        this.password =passwordhash
        this.checkbox=undefined
        this.cpassword=cpassword
        next()
    } catch (error) {
        next(error)
    }
})


const Sadata = new mongoose.model("Sadata", dataSchema)





module.exports = Sadata