import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminDatas } from "../../../context/admin/AdminContext";
import "../css/AssignTaskPage.css";
import SelectDeveloper from "./components/AssignTask components/SelectDeveloper";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import SelectSingleDeveloper from "./components/AssignTask components/SelectSingleDeveloper";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const AssignTaskPage = () => {
    const { id } = useParams(); //project id
    const {
        projects,
        getAllProjects,
        setAlertBox,
        setAlertMessage,
        alertBox,
        alertMessage,
    } = useContext(AdminDatas); //all projects

    const [singleProject, setSingleProject] = useState(""); //current project

    useEffect(() => {
        if (id !== "null" && projects) {
            const temp = projects.filter((each) => each._id === id);
            setSingleProject(temp[0]);
        }
    }, [projects]);

    // selected member and tasks
    const [devTask, setDevTask] = useState({
        name: "",
        allTask: [],
    });

    const handleMemberAndTask = (e) => {
        const singleDevTaskArray =
            singleProject.project_members.developers.filter(
                (each) => each.name === e.target.value,
            );
        if (singleDevTaskArray[0].task_list === undefined)
            singleDevTaskArray[0].task_list = [];
        setDevTask({
            name: e.target.value,
            allTask: [...singleDevTaskArray[0].task_list],
        });
    };

    // temp task for onchange task input.
    const [tempTask, setTempTask] = useState({
        task: "",
        status: "pending",
        task_id: "",
    });

    const handleNewTaskValue = (e) => {
        setTempTask({
            ...tempTask,
            task: e.target.value,
            task_id: uuidv4(),
        });
    };

    const addNewTask = () => {
        setDevTask({ ...devTask, allTask: [...devTask.allTask, tempTask] });
    };

    // Assign Task and update DB.

    const assignTaskAndUpdate = async () => {
        if (!devTask.name || !devTask.allTask.length) {
            setAlertMessage("Developer and Task is required");
            alerter(setAlertBox);
            return;
        }

        const developersArray = singleProject.project_members.developers.map(
            (each) => {
                if (each.name === devTask.name) {
                    return { ...each, task_list: devTask.allTask };
                } else {
                    return each;
                }
            },
        );

        const idAndDevArr = {
            projectId: singleProject._id,
            devArray: developersArray,
        };

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_API_URL}/project_manager/update_dev_list`,
                idAndDevArr,
            );

            if (response.data) {
                getAllProjects();
                setTempTask({
                    status: "pending",
                });
                setDevTask({
                    name: "",
                    allTask: [],
                });

                setAlertMessage("Assign task successfully");
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-fluid p-2 assign_task_div">
            <h3 className="mb-4">Assign Task</h3>
            <div className="row assign_task_page d-flex justify-content-around">
                <div className="col-12 col-lg-5 p-3 assign_select_dev">
                    <label htmlFor="assign_task" className="mb-2">
                        Select Developer
                    </label>
                    <select
                        name="person"
                        id="assign_task"
                        value={devTask.name}
                        onChange={handleMemberAndTask}
                    >
                        <option>--Select Developer--</option>
                        {singleProject && (
                            <SelectDeveloper
                                developers={
                                    singleProject.project_members.developers
                                }
                            />
                        )}
                    </select>
                </div>
                <div className="col-12 col-lg-5 p-3 assign_add_task">
                    <div>
                        <label htmlFor="task_box" className="mb-2">
                            Add Task
                        </label>
                        <input
                            id="task_box"
                            name="task"
                            placeholder="Add task"
                            value={tempTask.task}
                            onChange={handleNewTaskValue}
                        />
                    </div>
                    <button
                        type="button"
                        className="mt-3 add_task_btn"
                        onClick={addNewTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <div className="row my-5">
                <div className="col-12 col-lg-10 p-3 mx-auto assign_task_box">
                    <h4 className="mb-3">
                        Project Title : {singleProject.project_title}
                    </h4>
                    <h5 className="mb-3">
                        Developer :&nbsp;
                        {<SelectSingleDeveloper devName={devTask.name} />}
                    </h5>
                    <div>
                        <ul className="task_unorder">
                            {devTask.allTask.length ? (
                                devTask.allTask.map((task, index) => (
                                    <li key={index}>{task.task}</li>
                                ))
                            ) : (
                                <h6>Task list is empty</h6>
                            )}
                        </ul>
                    </div>
                    <button
                        type="button"
                        className="mt-3 assign_task_btn"
                        onClick={assignTaskAndUpdate}
                    >
                        Assign Task
                    </button>
                </div>
            </div>
            <AlertBox alertBox={alertBox} message={alertMessage} />
        </div>
    );
};

export default AssignTaskPage;
