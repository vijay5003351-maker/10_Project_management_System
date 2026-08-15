import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { FaNetworkWired } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

import "../../css/AdminNavigation.css";
import { AdminDatas } from "../../../../context/admin/AdminContext";

const AdminNavigation = () => {
    const { toggle, setToggle } = useContext(AdminDatas);
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
            <Link to="" className="add_member_link" onClick={handleNavClick}>
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
                to="add_members"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <MdOutlineGroupAdd />
                        </i>
                    </div>
                    <div>
                        <p>Add Members</p>
                    </div>
                </div>
            </Link>
            <Link
                to="view_members"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <FaRegEye />
                        </i>
                    </div>
                    <div>
                        <p>View Members</p>
                    </div>
                </div>
            </Link>
            <Link
                to="add_remove_skills"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <IoBookOutline />
                        </i>
                    </div>
                    <div>
                        <p>Add / Remove Skills</p>
                    </div>
                </div>
            </Link>
            <Link
                to="assign_projects"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <FaNetworkWired />
                        </i>
                    </div>
                    <div>
                        <p>Assign Projects</p>
                    </div>
                </div>
            </Link>
            <Link
                to="view_projects"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <GoTasklist />
                        </i>
                    </div>
                    <div>
                        <p>Projects</p>
                    </div>
                </div>
            </Link>
            <Link
                to="submitted_projects"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <MdOutlineChecklistRtl />
                        </i>
                    </div>
                    <div>
                        <p>Submitted Projects</p>
                    </div>
                </div>
            </Link>
            <Link
                to="admin_profile"
                className="add_member_link"
                onClick={handleNavClick}
            >
                <div className="admin_opt_nav px-3 py-2">
                    <div>
                        <i>
                            <FaUserAstronaut />
                        </i>
                    </div>
                    <div>
                        <p>My Profile</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AdminNavigation;
