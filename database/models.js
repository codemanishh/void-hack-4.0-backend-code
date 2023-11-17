const mongoose = require('mongoose')
const userSchema = require('./schemas/user')
const complainSchema=require('./schemas/complain');
const dailyDataSchema=require('./schemas/daily_data')

const models = () => {
    mongoose.models = {}
    const user=new mongoose.model('user',userSchema);
    const complain=new mongoose.model('complain',complainSchema);
    const dailyData=new mongoose.model('daily_data',dailyDataSchema);
    return { user,  complain,dailyData};
}
module.exports = models;