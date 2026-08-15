const router = require("express").Router();
const members = require("../models/memberSchema");
const skills = require("../models/skillsSchema");
const projects = require("../models/projectSchema");
const users = require("../models/userSchema");

router.post("/set_admin", async (req, res) => {
    const admin = { email: "admin@mail.com", password: "123456" };

    try {
        const prev = await users.find();
        if (!prev.length) {
            const defAdmin = new users(admin);
            await defAdmin.save();
        }
        res.status(200).json({ message: "Default admin setting is updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Default admin setting is failed" });
    }
});

router.post("/get", async (req, res) => {
    try {
        const allMembers = await members.find();
        res.status(200).json({
            message: "Get all Members successfully",
            allMembers,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/add_members", async (req, res) => {
    const data = req.body;

    try {
        const newMember = new members(data);
        await newMember.save();
        res.status(200).json({
            message: "Member Successfully Added",
            newMember,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/delete_member", async (req, res) => {
    try {
        const { id } = req.body;
        const response = await members.findByIdAndUpdate(id, {
            $set: { "Work.status": "drop" },
        });

        if (response) {
            res.status(200).json({ message: "Member Deleted Successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/add_skills", async (req, res) => {
    const skill = req.body;

    try {
        const response = new skills(skill);
        await response.save();

        res.status(200).json({
            message: "Skill added successfully",
            response,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Skill not add in database.",
        });
    }
});

router.post("/get_all_skills", async (req, res) => {
    try {
        const allSkills = await skills.find();
        if (allSkills) {
            res.status(200).json({
                message: "Skills successfully fetched",
                allSkills,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Skills not fetched." });
    }
});

router.post("/remove_skill", async (req, res) => {
    const { skill_id } = req.body;

    try {
        const response = await skills.findByIdAndDelete(skill_id);

        if (response) {
            res.status(200).json({ message: "Successfully skill deleted" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/add_project", async (req, res) => {
    const projectDetails = req.body;
    const managerId = projectDetails.project_members.project_manager.name;

    const devIdArray = projectDetails.project_members.developers;

    let projectId;

    try {
        const projectData = await new projects(projectDetails);
        await projectData.save();
        projectId = projectData._id;
        res.status(200).json({
            message: "Project successfully stored in DB",
            projectData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to store project in db" });
    }

    try {
        const response = await members.findByIdAndUpdate(managerId, {
            $set: {
                "Work.status": "working",
                "Work.currentProjectId": projectId,
            },
        });
        if (response) {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Work status update failed" });
    }

    for (let i = 0; i < devIdArray.length; i++) {
        try {
            const response = await members.findByIdAndUpdate(
                devIdArray[i].name,
                {
                    $set: {
                        "Work.status": "working",
                        "Work.currentProjectId": projectId,
                    },
                },
            );
            if (response) {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Work status update failed" });
        }
    }
});

// fetching projects
router.post("/get_projects", async (req, res) => {
    try {
        const allProjects = await projects.find();

        if (allProjects) {
            res.status(200).json({
                message: "Projects successfully fetched",
                allProjects,
            });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/complete_project", async (req, res) => {
    const project = req.body;

    const managerId = project.project_members.project_manager.name;

    const devIdArray = project.project_members.developers;

    try {
        const response = await projects.findByIdAndUpdate(project._id, {
            $set: {
                "project_members.project_manager.progress.totalProgress":
                    "completed",
            },
        });

        if (response) {
            console.log("Project status successfully updated");
        }
    } catch (err) {
        console.log(err);
    }

    for (let i = 0; i < devIdArray.length; i++) {
        try {
            const response = await members.findByIdAndUpdate(
                devIdArray[i].name,
                {
                    $set: {
                        "Work.status": "available",
                        "Work.currentProjectId": "null",
                    },
                },
            );
            if (response) {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Work status update failed" });
        }
    }

    try {
        const response = await members.findByIdAndUpdate(managerId, {
            $set: {
                "Work.status": "available",
                "Work.currentProjectId": "null",
            },
        });
        if (response) {
            console.log(response);
            res.status(200).json({
                message: "All Status update process is completed",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Work status update failed" });
    }
});

router.post("/update_profile", async (req, res) => {
    const { id, email, password } = req.body;
    try {
        const response = await users.findByIdAndUpdate(id, {
            email,
            password,
        });

        if (response) {
            res.status(200).json({
                message: "Admin detail successfully updated",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Admin detail update is failed" });
    }
});

module.exports = router;
