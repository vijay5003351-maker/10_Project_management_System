const router = require("express").Router();
const projects = require("../models/projectSchema");
const members = require("../models/memberSchema");

router.post("/update_dev_reqArray", async (req, res) => {
    const { myProject, tempDevArray, tempReqArray } = req.body;
    try {
        const updateDev = await projects.findByIdAndUpdate(myProject._id, {
            $set: { "project_members.developers": tempDevArray },
        });

        const updateReqArr = await projects.findByIdAndUpdate(myProject._id, {
            request_list: tempReqArray,
        });

        if (updateReqArr) {
            res.status(200).json({
                message: "Project document successfully updated",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Project document update is failed",
        });
    }
});

router.post("/update_profile", async (req, res) => {
    const personDetail = req.body;
    try {
        const response = await members.findByIdAndUpdate(
            personDetail._id,
            personDetail,
        );

        if (response) {
            res.status(200).json({
                message: "Profile Successfully Updated",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Dev profile update is failed" });
    }
});

module.exports = router;
