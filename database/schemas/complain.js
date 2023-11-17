const mongoose=require('mongoose');
const complainSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    complain_heading:{
        type:String,
        required:true
    },
    complain_description:{
        type:String,
        required:true
    },
    zone_id:{
        type:String
    },
    images:{
        type:Array,
        required:true,
        minItems:1,
    }
});
module.exports=complainSchema;