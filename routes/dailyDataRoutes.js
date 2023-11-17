const express = require('express')
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const models = require('../database/models');
const fetchuser = require('../middleware/fetch_user')
router.post('/mark', fetchuser, async (req, res) => {
    const { dailyData, user } = models();
    try {
        let active = await user.findOne({ _id: req.user.id })
        if (!active) {
            return res.status(400).json({ error: "invalid authentication" })
        } else {
            await dailyData.create({ ...req.body, user: req.user.id })
            const data = await dailyData.find({ user: req.user.id });
            res.status(200).json({ data })
        }
    } catch (e) {
        res.status(400).json({ error: "some error ocured " })
    }
})

router.get('/getmydata', fetchuser, async (req, res) => {
    const { dailyData, user } = models();
    try {
        let active = await user.findOne({ _id: req.user.id });
        if (!active) {
            return res.status(400).json({ error: "invalid authentication" })
        } else {
            const data = await dailyData.find({ user: req.user.id });
            res.status(200).json({ data })
        }
    }
    catch (e) {
        res.status(400).json({ error: "some error ocured " })
    }
})
module.exports = router;