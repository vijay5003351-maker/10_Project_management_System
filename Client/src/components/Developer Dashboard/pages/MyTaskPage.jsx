import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminDatas } from "../../../context/admin/AdminContext";
import TaskList from "./components/MyTask components/TaskList";
import { MemberDatas } from "../../../context/members/MembersContext";
import "../css/MyTaskPage.css";

const MyTaskPage = () => {
    const { id } = useParams();
    const { projects } = useContext(AdminDatas);
    const { loginMember } = useContext(MemberDatas);
    const [myProject, setMyProject] = useState("");
    useEffect(() => {
        if (id !== "null" && projects) {
            const temp = projects.filter((each) => each._id === id);
            setMyProject(temp[0]);
        }
    }, [projects]);
    return (
        <div className="container-fluid">
            <h3 className="mb-3">My Tasks</h3>
            <div className="row my_task_page_container">
                <TaskList myProject={myProject} loginMember={loginMember} />
            </div>
        </div>
    );
};

export default MyTaskPage;
