import { useContext, useState } from "react";

import "../../Admin Dashboard/css/AssignProjectsPage.css";
import SelectProjectManager from "./components/AssignProjects Components/SelectProjectManager";
import SelectDevelopers from "./components/AssignProjects Components/SelectDevelopers";
import DevelopersArray from "./components/AssignProjects Components/DevelopersArray";
import ProjectsDetailsPM from "./components/AssignProjects Components/ProjectsDetailsPM";
import ProjectDetailsDev from "./components/AssignProjects Components/ProjectDetailsDev";
import { AdminDatas } from "../../../context/admin/AdminContext";
import axios from "axios";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const AssignProjectsPage = () => {
    const {
        getAllMembers,
        getAllProjects,
        alertBox,
        setAlertBox,
        setAlertMessage,
        alertMessage,
    } = useContext(AdminDatas);
    const [assignProject, setAssignProject] = useState({
        project_title: "",
        project_manager: "",
        developers: [],
    });

    // temp stores
    const [tempTitle, setTempTitle] = useState("");
    const [tempPM, setTempPM] = useState("");
    const [developersArray, setDevelopersArray] = useState([]);
    const [tempDev, setTempDev] = useState("");

    const handleDevelopersArray = () => {
        setDevelopersArray([...developersArray, tempDev]);
        setTempDev("");
    };

    // assign methods

    const assignProjectTitle = () => {
        setAssignProject({
            ...assignProject,
            project_title: tempTitle,
        });
        setTempTitle("");
    };

    const assignProjectManager = () => {
        setAssignProject({ ...assignProject, project_manager: tempPM });
        setTempPM("");
    };

    const assignDevelopers = () => {
        setAssignProject({
            ...assignProject,
            developers: [...developersArray],
        });
        setTempDev("");
        setDevelopersArray([]);
    };

    // submit project data

    const handleAddProject = async () => {
        if (
            assignProject.project_manager === "" ||
            assignProject.project_title === "" ||
            assignProject.length === 0
        ) {
            setAlertMessage(
                "Must assign all field Project title, Project Manager and Project developers",
            );
            alerter(setAlertBox);
            return;
        }

        const devArray = assignProject.developers.map((each) => {
            return {
                name: each,
                progress: {
                    percent: 0,
                    progress: "completed",
                    totalProgress: "pending",
                },
                task_list: [],
            };
        });
        const projectDetails = {
            project_title: assignProject.project_title,
            project_members: {
                project_manager: {
                    name: assignProject.project_manager,
                    progress: {
                        percent: 0,
                        progress: "completed",
                        totalProgress: "pending",
                    },
                },
                developers: devArray,
            },
            request_list: [],
            project_date: new Date(),
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/add_project`,
                projectDetails,
            );

            if (response.data) {
                setAssignProject({
                    project_title: "",
                    project_manager: "",
                    developers: [],
                });
                getAllProjects();
                getAllMembers();
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <h3 className="mb-4">Assign Projects</h3>
                <div className="row assign_PM_row">
                    <div className="col-12 col-lg-11 mb-4 d-flex flex-wrap justify-content-between gap-2">
                        <div className="project_title_div">
                            <label
                                htmlFor="Project_title"
                                className="project_title_label"
                            >
                                Project Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your project name:"
                                id="Project_title"
                                className="project_title_input"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                            />
                        </div>
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="project_title_save_btn"
                                onClick={assignProjectTitle}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 assign_PM_div mb-4">
                        <h4 className="mb-3">Select Project Manager</h4>
                        <form action="">
                            <select
                                name="project_manager"
                                id=""
                                value={tempPM}
                                onChange={(e) => setTempPM(e.target.value)}
                                required
                            >
                                <option value="">
                                    --Select Project Manager--
                                </option>
                                <SelectProjectManager />
                            </select>
                            <button
                                type="button"
                                onClick={assignProjectManager}
                            >
                                Assign Project Manager
                            </button>
                        </form>
                    </div>
                    <div className="col-12 col-lg-5 assign_DEV_div mb-3">
                        <h4 className="mb-3">Select Developers</h4>
                        <form action="" className="mb-3">
                            <select
                                name="developers"
                                id=""
                                value={tempDev}
                                onChange={(e) => setTempDev(e.target.value)}
                            >
                                <option value="">--Select Developers--</option>
                                <SelectDevelopers />
                            </select>
                            <div className="d-flex justify-content-center gap-3 flex-wrap my-3">
                                <DevelopersArray developers={developersArray} />
                            </div>
                            <div className="assign_btn_div">
                                <button
                                    type="button"
                                    onClick={handleDevelopersArray}
                                >
                                    Add Developer
                                </button>
                                <button
                                    type="button"
                                    onClick={assignDevelopers}
                                >
                                    Assign Developers
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12 col-lg-7 mx-auto p-3 assign_project_board">
                        <h3 className="mb-3">Project Details</h3>
                        <div>
                            <div>
                                <div>
                                    <h5>Project Title:</h5>
                                </div>
                                <div>
                                    {assignProject.project_title !== ""
                                        ? assignProject.project_title
                                        : "add project title"}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5>Project Manager:</h5>
                                </div>
                                <div>
                                    <ProjectsDetailsPM
                                        assignProject={assignProject}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h5>Project Developers:</h5>
                                </div>
                                <div className="d-flex gap-2 flex-wrap">
                                    <ProjectDetailsDev
                                        assignProject={assignProject}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-3 add_project_btn"
                            onClick={handleAddProject}
                        >
                            Add Project
                        </button>
                    </div>
                </div>
                <AlertBox alertBox={alertBox} message={alertMessage} />
            </div>
        </>
    );
};

export default AssignProjectsPage;
