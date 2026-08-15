import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminDatas } from "../../../context/admin/AdminContext";
import SubmitTaskDevBox from "./components/SubmittedTask components/SubmitTaskDevBox";
import "../css/SubmittedTaskPage.css";
import SubmitSingleTask from "./components/SubmittedTask components/SubmitSingleTask";

const SubmittedTaskPage = () => {
    const { id } = useParams();
    const { projects } = useContext(AdminDatas);
    const [myProject, setMyProject] = useState("");

    useEffect(() => {
        if (projects) {
            const temp = projects.filter((each) => each._id === id);
            setMyProject(temp[0]);
        }
    }, [projects]);

    const [reqPerson, setReqPerson] = useState("all");
    return (
        <>
            {id === "null" ? (
                <h3>No Project you are working.</h3>
            ) : myProject ? (
                <div className="container-fluid">
                    <h3 className="mb-3">Developers submitted task</h3>
                    <div className="d-flex gap-3 flex-wrap mb-3 submit_task_dev_box">
                        <SubmitTaskDevBox
                            developers={myProject.project_members.developers}
                            setReqPerson={setReqPerson}
                        />
                    </div>
                    <div className="submit_task_holder p-2">
                        {reqPerson === "all" && (
                            <SubmitSingleTask
                                reqList={myProject.request_list}
                                myProject={myProject}
                            />
                        )}
                        {reqPerson !== "all" && (
                            <SubmitSingleTask
                                reqList={myProject.request_list.filter(
                                    (each) => each.name === reqPerson,
                                )}
                                myProject={myProject}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <h3>Loading....</h3>
            )}
        </>
    );
};

export default SubmittedTaskPage;
