const express = require('express')
const router = express.Router();
const secret_key = "i love coffee / code / js";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { body, validationResult, query } = require('express-validator');
const models = require('../database/models');
const { Router } = require('express');
const fetchuser = require('../middleware/fetch_user');

router.get("/login",
    [
        query('email', "enter a valid email").isEmail(),
        query('password', "Enter a valid password").isLength({ max: 10, min: 5 })
    ],
    async (req, res) => {
        const validData = validationResult(req);
        if (validData.errors.length != 0)

            return res.status(400).json({ error: validData.errors })
        else {
            try {
                const { user } = models()
                let active = await user.findOne({ email: req.query.email })
                if (!active) return res.status(400).json({ error: 'invalid login' })
                const passwordCompare = await bcrypt.compare(req.query.password, active.password);
                if (!passwordCompare) return res.status(400).json({ error: 'invalid login' })
                const data = {
                    user: {
                        id: active._id
                    }
                }
                res.status(200).json({ auth_token: jwt.sign(data, secret_key) })
            } catch (e) {
                console.log(e)
                res.status(400).json({ error: "internal server error is here" })
            }
        }
    }
);

router.post("/signup", [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid user name').isString(),
    body('contact_number', 'Enter a valid contact number').isString(),
    body('password', "Enter a valid password").isString(),
    body('house_number', "Enter the house number").isString(),
    body('zone_id', "Enter the zone id").isString(),
    body('ward_id', "Enter the ward id").isString(),
], async (req, res) => {
    const validData = validationResult(req);
    if (validData.errors.length != 0) {
        console.log(validData, "errors")
        return res.status(400).json({ error: validData.errors })
    }
    else {
        try {
            const { user } = models()
            let avilableUser = await user.findOne({ email: req.body.email });
            if (avilableUser) {
                res.status(400).json({ error: "user already exists" })
            } else {
                const salt = bcrypt.genSaltSync(10);
                const requestObject = {
                    email: req.body.email,
                    name: req.body.name,
                    contact_number: req.body.contact_number,
                    password: await bcrypt.hash(req.body.password, salt),
                    ward_id: req.body.ward_id,
                    profile_image: req.body.profile_image,
                    house_number: req.body.house_number,
                    zone_id: req.body.zone_id,
                }
                await user.create(requestObject)
                let active = await user.findOne({ email: requestObject.email })
                const data = {
                    user: {
                        id: active._id
                    }
                }
                // await strike.create({user:data.user.id})
                res.status(200).json({ auth_token: jwt.sign(data, secret_key), account_type: active.account_type })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: "internal server error is here" })
        }
    }
})

router.get('/getme', fetchuser, async (req, res) => {
    try {
        const { user } = models();;
        let avilableUser = await user.findById(req.user.id).select("-password");
        if (!avilableUser) res.status(403).json({ errors: "invalid token " })
        else {
            res.status(200).json({ user: avilableUser })
        }
    } catch (e) {
        res.status(400).json({ error: "internal server error occred" })
    }
})

module.exports = router;