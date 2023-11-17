const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    profile_image:{
        type:String,
    },
    email:{
        type:String
    },
    name: {
        type: String,
    },
    house_number: {
        type: String,
    },
    zone_id: {
        type: String
    },
    ward_id: {
        type: String,
    },
    contact_number:{
        type:String,
    },
    password:{
        type:String
    }
})
module.exports=userSchema;