import { useContext } from "react";
import { AdminDatas } from "../../../context/admin/AdminContext";
import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import "../css/ProjectsPage.css";
import GetProjectManager from "./components/Projects Componnets/GetProjectManager";
import GetProjectDevs from "./components/Projects Componnets/GetProjectDevs";

const ProjectsPage = () => {
    const { projects } = useContext(AdminDatas);
    return (
        <div className="container-fluid p-2">
            <h2 className="mb-3">Projects</h2>
            <div className="row">
                {projects.length ? (
                    projects.map((each) => (
                        <div
                            className="col-12 col-lg-6 mb-3 p-md-2"
                            key={each._id}
                        >
                            <div className="projects_box p-3">
                                <h4 className="mb-3 p-2 project_title">
                                    {each.project_title}
                                </h4>
                                <div className="mb-2 flex-wrap">
                                    <div>
                                        <h5>Project Manager:</h5>
                                    </div>
                                    <div>
                                        <GetProjectManager
                                            managerId={
                                                each.project_members
                                                    .project_manager.name
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex-wrap">
                                    <div className="dev_project_page_heading">
                                        <h5>Developers:</h5>
                                    </div>
                                    <div>
                                        <GetProjectDevs
                                            developers={
                                                each.project_members.developers
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="justify-content-between mb-3">
                                    <div className="progress_div">
                                        <h6 className="mb-1">
                                            Progress:
                                            {
                                                each.project_members
                                                    .project_manager.progress
                                                    .percent
                                            }
                                            %
                                        </h6>
                                        <div
                                            style={{
                                                height: "5px",
                                                width: `${each.project_members.project_manager.progress.percent}%`,
                                                backgroundColor: "red",
                                                borderRadius: "5px",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="justify-content-end">
                                    <Link to={`${each._id}`}>
                                        <p className="d-flex align-items-center gap-1 see_full_details">
                                            see full details
                                            <IoIosArrowForward
                                                style={{ fontSize: "16px" }}
                                            />
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>Empty list</h3>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
