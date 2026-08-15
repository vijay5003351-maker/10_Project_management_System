import { useContext } from "react";
import { AdminDatas } from "../../../context/admin/AdminContext";
import axios from "axios";
import "../css/SubmittedProjectsPage.css";
import GetProjectManager from "./components/Projects Componnets/GetProjectManager";
import GetProjectDevs from "./components/Projects Componnets/GetProjectDevs";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const SubmittedProjectsPage = () => {
    const {
        projects,
        getAllProjects,
        getAllMembers,
        alertBox,
        alertMessage,
        setAlertBox,
        setAlertMessage,
    } = useContext(AdminDatas);

    const handleAdminProjectComplete = async (project) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/complete_project`,
                project,
            );
            if (response.data) {
                getAllProjects();
                getAllMembers();
                console.log(`Projects completed status successfully updated`);
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <div className="container-fluid">
            <h3 className="mb-3">Submitted Projects</h3>

            {projects.length ? (
                projects
                    .filter(
                        (each) =>
                            each.project_members.project_manager.progress
                                .totalProgress !== "pending" &&
                            each.project_members.project_manager.progress
                                .totalProgress !== "Project Finished",
                    )
                    .map((each, index) => (
                        <div
                            className="submitted_projects_div p-2 mb-3"
                            key={index}
                        >
                            <div className="d-flex gap-2 flex-wrap mb-3 submit_request_list">
                                <div>
                                    <h6>Project Manager:</h6>
                                    <p>
                                        <GetProjectManager
                                            managerId={
                                                each.project_members
                                                    .project_manager.name
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="req_task">
                                    <h6>Developers:</h6>
                                    <section>
                                        <GetProjectDevs
                                            developers={
                                                each.project_members.developers
                                            }
                                        />
                                    </section>
                                </div>
                                <div>
                                    <h6>Status:</h6>
                                    <p>
                                        {each.project_members.project_manager
                                            .progress.totalProgress ===
                                        "Waiting for response"
                                            ? "submitted"
                                            : "completed"}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="req_complete_btn"
                                        value="completed"
                                        disabled={
                                            each.project_members.project_manager
                                                .progress.totalProgress ===
                                            "Waiting for response"
                                                ? false
                                                : true
                                        }
                                        onClick={() =>
                                            handleAdminProjectComplete(each)
                                        }
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                            <AlertBox
                                alertBox={alertBox}
                                message={alertMessage}
                            />
                        </div>
                    ))
            ) : (
                <h4>List is empty</h4>
            )}
        </div>
    );
};

export default SubmittedProjectsPage;
