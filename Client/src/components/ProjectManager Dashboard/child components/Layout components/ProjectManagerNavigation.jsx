import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGears } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

import "../../../Admin Dashboard/css/AdminNavigation.css";
import { MemberDatas } from "../../../../context/members/MembersContext";
import { AdminDatas } from "../../../../context/admin/AdminContext";

const ProjectManagerNavigation = () => {
    const { toggle, setToggle } = useContext(AdminDatas);
    const { loginMember } = useContext(MemberDatas);

    const handleNavClick = (e) => {
        setToggle(false);

        for (let div of document.querySelectorAll(".admin_opt_nav")) {
            div.classList.remove("onActive");
        }
        e.target.closest(".admin_opt_nav").classList.add("onActive");
    };

    return (
        <div
            className={
                toggle
                    ? "admin_nav_box p-2 nav_col"
                    : "admin_nav_box p-2 nav_col go_left"
            }
        >
            {loginMember && (
                <>
                    <Link
                        to=""
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2 onActive">
                            <div>
                                <i>
                                    <RxDashboard />
                                </i>
                            </div>
                            <div>
                                <p>Dashboard</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={`current_project/${
                            loginMember.Work.currentProjectId ?? "null"
                        }`}
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2">
                            <div>
                                <i>
                                    <FaGears />
                                </i>
                            </div>
                            <div>
                                <p>Current Project</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="my_all_projects"
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2">
                            <div>
                                <i>
                                    <GrProjects />
                                </i>
                            </div>
                            <div>
                                <p>My All Projects</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={`assign_task/${
                            loginMember.Work.currentProjectId ?? "null"
                        }`}
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2">
                            <div>
                                <i>
                                    <FaTasks />
                                </i>
                            </div>
                            <div>
                                <p>Assign Task</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to={`submitted_task/${
                            loginMember.Work.currentProjectId ?? "null"
                        }`}
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2">
                            <div>
                                <i>
                                    <GrInProgress />
                                </i>
                            </div>
                            <div>
                                <p>Submitted Task</p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="my_profile"
                        className="add_member_link"
                        onClick={handleNavClick}
                    >
                        <div className="admin_opt_nav px-3 py-2">
                            <div>
                                <i>
                                    <FaUserTie />
                                </i>
                            </div>
                            <div>
                                <p>My Profile</p>
                            </div>
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
};

export default ProjectManagerNavigation;
