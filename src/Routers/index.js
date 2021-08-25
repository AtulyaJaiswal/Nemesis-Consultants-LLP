const express = require('express');
const router = express.Router();
const User = require('../Models/index');
const Token = require('../Models/token')
const { check, validationResult } = require('express-validator');
const authenticate = require('../Authenticate/index');
const authenticateLog = require('../Authenticate/logToken')

require('../Models/index');
require('../Database/index');

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill the field properly." });
    }

    try {
        const user = new Token({});
        token = await user.generateAuthToken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true
        });
        await user.save();

        if (email === "admin@namasys.co" && password === "admin123") {
            return res.status(201).json({ message: "User Logged in Successfully" });
        }
        else {
            return res.status(401).json({ error: "Failed to Log in" });
        }

    } catch (err) { console.log(err); }
});

router.post('/userDetails', authenticateLog, [
    check('username').isAlphanumeric().withMessage('Username should contain only numbers and characters'),
    check('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile Number should be 10 of 10 digits'),
    check('email').isEmail().withMessage('Email should be proper')
], async (req, res) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(401).json({ error: "Please fill the fields properly" })
    }

    const { username, mobile, email, address } = req.body;

    if (!username || !mobile || !email || !address) {
        return res.status(401).json({ error: "Please fill the field properly." });
    }

    try {

        const user = new User({ username, mobile, email, address });
        token = await user.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true
        });
        const userDetail = await user.save();

        if (userDetail) {
            return res.status(201).json({ message: "Details Saved Successfully" });
        }
        else if (!userDetail) {
            return res.status(500).json({ error: "Failed to Save Details" });
        }
        else {
            return res.status(402).json({ error: "Session Expired" });
        }

    } catch (err) { console.log(err); }
});

router.get('/data', authenticate,  (req, res) => {
    res.send(req.user);
});

router.delete('/dataDelUsername', authenticate, async (req, res) => {
    const { username } = req.body;

    try {
        const deleteUsername = await User.findOneAndUpdate({ username: username }, { $unset: { "username": "" } });

        if (deleteUsername) {
            return res.status(200).json({ message: "Detail Deleted Successfully" });
        }
        else {
            return res.status(401).json({ message: "Session Expired" });
        }
    } catch (err) { console.log(err); }
});
router.delete('/dataDelMobile', authenticate, async (req, res) => {
    const { mobile } = req.body;

    try {
        const deleteMobile = await User.findOneAndUpdate({ mobile: mobile }, { $unset: { "mobile": "" } });

        if (deleteMobile) {
            return res.status(200).json({ message: "Detail Deleted Successfully" });
        }
        else if (!deleteMobile) {
            return res.status(400).json({ message: "Error" });
        }
        else {
            return res.status(401).json({ message: "Session Expired" });
        }
    } catch (err) { console.log(err); }
});
router.delete('/dataDelEmail', authenticate, async (req, res) => {
    const { email } = req.body;

    try {
        const deleteEmail = await User.findOneAndUpdate({ email: email }, { $unset: { "email": "" } });

        if (deleteEmail) {
            return res.status(200).json({ message: "Detail Deleted Successfully" });
        }
        else if (!deleteEmail) {
            return res.status(400).json({ message: "Error" });
        }
        else {
            return res.status(401).json({ message: "Session Expired" });
        }
    } catch (err) { console.log(err); }
});
router.delete('/dataDelAddress', authenticate, async (req, res) => {
    const { address } = req.body;

    try {
        const deleteAddress = await User.findOneAndUpdate({ address: address }, { $unset: { "address": "" } });

        if (deleteAddress) {
            return res.status(200).json({ message: "Detail Deleted Successfully" });
        }
        else if (!deleteAddress) {
            return res.status(400).json({ message: "Error" });
        }
        else {
            return res.status(401).json({ message: "Session Expired" });
        }
    } catch (err) { console.log(err); }
});

module.exports = router;