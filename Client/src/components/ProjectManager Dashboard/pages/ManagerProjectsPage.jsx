import { useContext, useEffect, useState } from "react";
import { AdminDatas } from "../../../context/admin/AdminContext";
import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
import "../../Admin Dashboard/css/ProjectsPage.css";
import GetProjectManager from "../../Admin Dashboard/Pages/components/Projects Componnets/GetProjectManager";
import GetProjectDevs from "../../Admin Dashboard/Pages/components/Projects Componnets/GetProjectDevs";
import { MemberDatas } from "../../../context/members/MembersContext";

const ManagerProjectsPage = () => {
    const { loginMember } = useContext(MemberDatas);
    const { projects } = useContext(AdminDatas);

    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        if (loginMember && projects.length) {
            const myWork = projects.filter(
                (each) =>
                    each.project_members.project_manager.name ===
                    loginMember._id,
            );

            const myDevWork = projects.filter((each) => {
                let minimize = each.project_members.developers;

                for (let i of minimize) {
                    if (i.name === loginMember._id) {
                        return each;
                    }
                }
            });

            setMyProjects([...myWork, ...myDevWork]);
        }
    }, [projects, loginMember]);
    return (
        <div className="container-fluid p-2">
            <h2 className="mb-3">Projects</h2>
            <div className="row">
                {myProjects.length ? (
                    myProjects.map((each) => (
                        <div
                            className="col-12 col-lg-4 p-md-2 mb-3"
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
                                    <div>
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
                                    <Link
                                        to={`${each._id}`}
                                        className="see_full_details_link"
                                    >
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

export default ManagerProjectsPage;
