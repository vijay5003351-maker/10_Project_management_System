const router = require("express").Router();
const projects = require("../models/projectSchema");

router.put("/update_dev_list", async (req, res) => {
    const { projectId, devArray } = req.body;

    try {
        const updatedDev = await projects.findByIdAndUpdate(projectId, {
            $set: {
                "project_members.developers": devArray,
            },
        });

        if (updatedDev) {
            res.status(200).json({
                message: "Developers update success",
                updatedDev,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Developers update is failed" });
    }
});

router.post("/update_dev_reqArray", async (req, res) => {
    const { myProject, tempDevArray, tempReqArray } = req.body;
    try {
        const updateDev = await projects.findByIdAndUpdate(
            myProject._id,
            {
                $set: { "project_members.developers": tempDevArray },
            },
            { new: true },
        );

        const updateReqArr = await projects.findByIdAndUpdate(
            myProject._id,
            {
                request_list: tempReqArray,
            },
            { new: true },
        );

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

router.post("/update_percent", async (req, res) => {
    const { tempDevArr, project_manager, myProject } = req.body;

    try {
        const updateDevArray = await projects.findByIdAndUpdate(
            myProject[0]._id,
            {
                $set: { "project_members.developers": tempDevArr },
            },
        );

        const updateProjectPercent = await projects.findByIdAndUpdate(
            myProject[0]._id,
            {
                $set: { "project_members.project_manager": project_manager },
            },
        );

        if (updateProjectPercent) {
            res.status(200).json({
                message: "Calculate and set project percent is completed",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Update percent developers failed" });
    }
});

router.post("/submit_project", async (req, res) => {
    const { projectId } = req.body;

    try {
        const response = await projects.findByIdAndUpdate(projectId, {
            $set: {
                "project_members.project_manager.progress.totalProgress":
                    "Waiting for response",
            },
        });

        if (response) {
            res.status(200).json({ message: "Project successfully submitted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Project submission is failed" });
    }
});

module.exports = router;
