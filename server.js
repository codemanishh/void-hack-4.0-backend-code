const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const path=require('path')
const database = require('./database/connection')
const cors = require('cors');
// const upload_image = require('./middleware/upload_image');
app.use(cors({
    origin: "*",
}))
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, "public/image")
    },
    filename: function (req, file, cb) {
        console.log(file, "req");
        cb(null,file.originalname)
    }
})
const upload = multer({ storage: storage })
database();
app.use(express.json())
app.use('/user', require('./routes/userRoutes'))
app.use('/dailydata', require('./routes/dailyDataRoutes'))
app.use('/complain', require('./routes/complainRoutes'))
app.post('/single', upload.array('image'), (req, res) => {
    res.status(200).json({req})
})
app.use('/static', express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`server is listened at localhost:${port}`)
})