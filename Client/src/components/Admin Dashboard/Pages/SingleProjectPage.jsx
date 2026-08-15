import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/SingleProjectPage.css";

import { AdminDatas } from "../../../context/admin/AdminContext";
import GetProjectManager from "./components/Projects Componnets/GetProjectManager";
import GetProjectDevs from "./components/Projects Componnets/GetProjectDevs";
import DevelopersBox from "./components/SingleProject Components/DevelopersBox";
import { MemberDatas } from "../../../context/members/MembersContext";
import axios from "axios";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const SingleProjectPage = () => {
    const { id } = useParams();
    const {
        projects,
        getAllProjects,
        alertBox,
        alertMessage,
        setAlertBox,
        setAlertMessage,
    } = useContext(AdminDatas);
    const { loginMember } = useContext(MemberDatas);

    const [singleProject, setSingleProject] = useState("");

    useEffect(() => {
        if (id !== "null" && projects) {
            const temp = projects.filter((each) => each._id === id);
            setSingleProject(temp[0]);
        }
    }, [projects]);

    // Handle Submit Project

    const handleSubmitProject = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/project_manager/submit_project`,
                { projectId: singleProject._id },
            );
            if (response.data) {
                console.log(`Project successfully submitted`);
                getAllProjects();
                setAlertMessage("Project successfully submitted to Admin");
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-fluid single_project_div">
            <h2 className="mb-4 p-2 single_project_title">
                Project : {singleProject && singleProject.project_title}
            </h2>
            {id !== "null" ? (
                <>
                    <div className="row single_project_row justify-content-around">
                        <div className="col-12 col-lg-5 p-3 mb-3 mb-lg-0">
                            <h4 className="mb-3 d-flex flex-wrap gap-2">
                                Project Manager :
                                {singleProject && (
                                    <GetProjectManager
                                        managerId={
                                            singleProject.project_members
                                                .project_manager.name
                                        }
                                    />
                                )}
                            </h4>
                            <div className="progress_div">
                                <h6 className="mb-1">
                                    Progress:&nbsp;
                                    {singleProject &&
                                        singleProject.project_members
                                            .project_manager.progress.percent}
                                    %
                                </h6>
                                <div
                                    style={{
                                        height: "5px",
                                        width: `${
                                            singleProject &&
                                            singleProject.project_members
                                                .project_manager.progress
                                                .percent
                                        }%`,
                                        backgroundColor: "red",
                                        borderRadius: "5px",
                                    }}
                                    className="mb-3"
                                ></div>
                                <p>
                                    Project Status :&nbsp;
                                    {singleProject &&
                                        singleProject.project_members
                                            .project_manager.progress
                                            .totalProgress}
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 p-3">
                            <h4 className="mb-3">Project Developers :</h4>
                            <div className="list">
                                {singleProject && (
                                    <GetProjectDevs
                                        developers={
                                            singleProject.project_members
                                                .developers
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12 col-lg-11 mx-auto p-3 dev_progress_div">
                            <h3 className="mb-4">Developers Progress:</h3>

                            <DevelopersBox singleProject={singleProject} />
                        </div>
                    </div>

                    <AlertBox alertBox={alertBox} message={alertMessage} />

                    {loginMember.Role === "Project Manager" &&
                        (singleProject ? (
                            <div className="col-11 mx-auto">
                                <button
                                    type="button"
                                    className="submit_project_btn"
                                    disabled={
                                        singleProject.project_members
                                            .project_manager.progress
                                            .totalProgress ===
                                        "Project Finished"
                                            ? false
                                            : true
                                    }
                                    onClick={handleSubmitProject}
                                >
                                    Submit Project
                                </button>
                            </div>
                        ) : (
                            false
                        ))}
                </>
            ) : (
                <h3>No Project you are now working.</h3>
            )}
        </div>
    );
};

export default SingleProjectPage;
