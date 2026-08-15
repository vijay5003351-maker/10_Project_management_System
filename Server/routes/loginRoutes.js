const router = require("express").Router();
const users = require("../models/userSchema");
const members = require("../models/memberSchema");

router.post("/admin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userEmail = await users.findOne({ email });
        if (!userEmail) {
            return res.status(400).json({ message: "User not found" });
        }

        if (userEmail.password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must have aleast 6 characters" });
        }

        if (userEmail.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login Success", userEmail });
    } catch (err) {
        console.log(err);
    }
});

router.post("/dev", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDev = await members.findOne({ Email: email });
        if (!userDev) {
            return res.status(400).json({ message: "User not found" });
        }

        if (userDev.Password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must have aleast 6 characters" });
        }

        if (userDev.Password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login Successful", userDev });
    } catch (err) {
        console.log(err);
    }
});

router.post("/PM", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userPM = await members.findOne({ Email: email });
        if (!userPM) {
            return res.status(400).json({ message: "User not found" });
        }
        if (userPM.Password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must have aleast 6 characters" });
        }

        if (userPM.Password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login Successful", userPM });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
