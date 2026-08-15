import { useContext, useEffect, useState } from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { BsHouseGear } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { AiOutlineAreaChart } from "react-icons/ai";

import "../css/AdminDashboard.css";
import { AdminDatas } from "../../../context/admin/AdminContext";

const AdminDashboard = () => {
    const { projects, allMembers } = useContext(AdminDatas);

    const [projectCounts, setProjectCounts] = useState({
        totalProjectCompleted: 0,
        totalWorkingProjects: 0,
    });
    const [memberCounts, setMemberCounts] = useState({
        totalDev: 0,
        totalPM: 0,
    });
    useEffect(() => {
        if (projects) {
            const completes = projects.filter(
                (each) =>
                    each.project_members.project_manager.progress
                        .totalProgress === "completed",
            );

            setProjectCounts({
                ...projectCounts,
                totalProjectCompleted: completes.length,
                totalWorkingProjects: projects.length - completes.length,
            });
        }

        if (allMembers) {
            const dev = allMembers.filter((each) => each.Role === "Developer");
            setMemberCounts({
                ...memberCounts,
                totalDev: dev.length,
                totalPM: allMembers.length - dev.length,
            });
        }
    }, [projects, allMembers]);
    return (
        <div className="container-fluid">
            <h3 className="mb-3">Dashboard</h3>

            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 p-1 p-sm-3 ">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Total Projects</h5>
                            <p>{projects.length}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(225, 34, 75)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <IoDocumentsOutline />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-1 p-sm-3 ">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Working Projects</h5>
                            <p>{projectCounts.totalWorkingProjects}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(183, 18, 189)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <BsHouseGear />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-sm-3 p-1">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Completed Projects</h5>
                            <p>{projectCounts.totalProjectCompleted}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(16, 161, 171)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <AiOutlineAreaChart />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-sm-3 p-1">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Developers</h5>
                            <p>{memberCounts.totalDev}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(120, 211, 22)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <FaUsersGear />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-sm-3 p-1">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Project Managers</h5>
                            <p>{memberCounts.totalPM}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(201, 69, 21)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <FaUserTie />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
