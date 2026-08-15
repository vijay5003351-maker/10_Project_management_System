import { useContext, useEffect, useState } from "react";
import { PiProjectorScreenChart } from "react-icons/pi";
import { RiPresentationFill } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";

import { AdminDatas } from "../../../context/admin/AdminContext";
import { MemberDatas } from "../../../context/members/MembersContext";
import SelectSingleDeveloper from "../../ProjectManager Dashboard/pages/components/AssignTask components/SelectSingleDeveloper";

const DevDashboard = () => {
    const { loginMember } = useContext(MemberDatas);
    const { projects } = useContext(AdminDatas);

    const [myProjects, setMyProjects] = useState([]);

    const [currentProgAndMembers, setCurrentProgAndMembers] = useState({
        progress: 0,
        members: [],
    });

    useEffect(() => {
        if (projects.length && loginMember) {
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

            const currentProject = projects.filter(
                (each) => each._id === loginMember.Work.currentProjectId,
            );

            let myObj;

            if (currentProject.length) {
                myObj = currentProject[0].project_members.developers.filter(
                    (each) => each.name === loginMember._id,
                );

                let coDev = [];

                currentProject[0].project_members.developers.forEach((each) => {
                    coDev.push(each.name);
                });

                setCurrentProgAndMembers({
                    ...currentProgAndMembers,
                    progress: myObj[0].progress.percent,
                    members: coDev,
                });
            }
        }
    }, [projects, loginMember]);
    return (
        <div className="container-fluid">
            <h3 className="mb-3">Dashboard</h3>
            <div className="row">
                <div className="col-12 p-3">
                    <div
                        className="py-2 px-3 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>My Total Projects</h5>
                            <p>{myProjects.length}</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "rgb(225, 34, 75)",
                            }}
                            className="d-flex align-items-center"
                        >
                            <PiProjectorScreenChart />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 p-3">
                    <div className="px-3 py-2 d-flex justify-content-around align-items-center dashboard_box">
                        <div>
                            <h5>Current Project Progress</h5>
                            <p>{currentProgAndMembers.progress}%</p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "orange",
                            }}
                            className="d-flex align-items-center"
                        >
                            <RiPresentationFill />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8 p-3 ">
                    <div
                        className="px-3 py-2 d-flex justify-content-around align-items-center dashboard_box"
                        style={{}}
                    >
                        <div>
                            <h5>Current Project Members</h5>
                            <p className="d-flex flex-wrap gap-3">
                                {currentProgAndMembers.members.length
                                    ? currentProgAndMembers.members.map(
                                          (each, index) => (
                                              <SelectSingleDeveloper
                                                  devName={each}
                                                  key={index}
                                              />
                                          ),
                                      )
                                    : "No one here.."}
                            </p>
                        </div>
                        <div
                            style={{
                                fontSize: "8em",
                                color: "purple",
                            }}
                            className="d-flex align-items-center"
                        >
                            <TiGroupOutline />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevDashboard;
