const mongoose = require("mongoose")
const formSchema = new mongoose.Schema({

    // Firstname: {
    //     type: String,
    //     require: true,
    // },
    // Lastname: {
    //     type: String,
    //     require: true,
    // },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
    // token: {
    //     type: String,
    //     default: ''
    // }
})
module.exports = mongoose.model("form", formSchema)
