const mongoose = require('mongoose')
const connectToMongo = async () => {
    await  mongoose.connect("mongodb+srv://eassyway22:akku5678@cluster0.wm07ztk.mongodb.net/?retryWrites=true&w=majority", () => { console.log("connection is successfull") })
}
module.exports = connectToMongo;