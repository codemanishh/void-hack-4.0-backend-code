const { application } = require('express');
const express = require('express')
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const models = require('../database/models');
const fetchuser = require('../middleware/fetch_user')
router.post('/makecomplain', fetchuser, async (req, res) => {
    console.log(req.user);
    const { complain, user } = models();
    try {
        // let avilableUser = await user.findById(req.user.id);
        // if (avilableUser) {
        //     return res.status(400).json({ error: "user is not present" })
        // }
        await complain.create({ ...req.body, user: req.user.id })
        const data = await complain.find({ user: req.user.id });
        res.status(200).json({ data: data });
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: "internal server error occred" })
    }
});

router.get('/mycomplain', fetchuser, async (req, res) => {
    const { user, complain } = models();
    try {
        const data = await complain.find({ user: req.user.id })
        res.status(200).json({ data })
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: "internal server error" })
    }
})

router.post('/complains', async (req, res) => {
    const { zone_id, page_size, page_number } = req.query;
    const { user, complain } = models();
    try {
        let data;
        if (!zone_id) {
            data = await complain.find();
        }
        else {
            data = await complain.find({ zone_id })
        }
        if (!page_size) {
            return res.status(200).json({ data })
        }
        else if (!page_number) {
            return res.status(200).json({ data: data.slice(0, page_size) })
        } else {
            data = data.slice(page_size * page_number, page_size || data.length())
            res.status(200).json({ data })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: "internal server error" })
    }
})

module.exports = router;