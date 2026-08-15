import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";
import alerter from "../../../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../../../common/AlertBox";

const TaskList = ({ myProject, loginMember }) => {
    // waiting for response || pending || completed . (For dev side)
    // submitted || completed || Rejected (For PM side)
    const {
        getAllProjects,
        alertBox,
        setAlertBox,
        alertMessage,
        setAlertMessage,
    } = useContext(AdminDatas);
    const [myObject, setMyObject] = useState("");

    useEffect(() => {
        if (myProject) {
            const obj = myProject.project_members.developers.filter(
                (each) => each.name === loginMember._id,
            );

            setMyObject(obj[0]);
        }
    }, [myProject]);

    // const [devArray, setArray] = useState([]);

    const handleSubmitTask = async (task_id) => {
        let current_task = {};
        const tempTaskListArray = myObject.task_list.map((each) => {
            if (each.task_id === task_id) {
                current_task = { ...each, status: "waiting for response" };
                return { ...each, status: "waiting for response" };
            } else {
                return each;
            }
        });

        const tempDevArray = myProject.project_members.developers.map(
            (each) => {
                if (each.name === loginMember._id) {
                    return { ...each, task_list: tempTaskListArray };
                } else {
                    return each;
                }
            },
        );

        const reqListObj = {
            name: myObject.name,
            task: current_task,
            status: "submitted",
            visit: "unseen",
        };

        const tempReqArray = [...myProject.request_list, reqListObj];

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/developer/update_dev_reqArray`,
                { myProject, tempDevArray, tempReqArray },
            );

            if (response.data) {
                console.log(
                    "Successfully submitted task to the Project Manager",
                );
                getAllProjects();
                setAlertMessage(
                    `Task successfully submitted to Project Manager`,
                );
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <>
            {!myObject ? (
                <h4>Task List is empty</h4>
            ) : myObject.task_list.length ? (
                myObject.task_list.map((each, index) => (
                    <div className="col-12 my_task_outer_div p-2" key={index}>
                        <div className="row my_task_inner_div d-flex gap-4">
                            <div className="col-12 col-xl-8 task_description p-2">
                                <p>
                                    <b>{index + 1}.</b> {each.task}
                                </p>
                            </div>
                            <div className="col-12 col-xl-3 d-flex justify-content-evenly task_details_div">
                                <div className="task_status">
                                    <p className="p-2">{each.status}</p>
                                </div>
                                <div className="task_btn_div">
                                    <button
                                        type="button"
                                        disabled={
                                            each.status === "pending"
                                                ? false
                                                : true
                                        }
                                        onClick={() =>
                                            handleSubmitTask(each.task_id)
                                        }
                                    >
                                        Submit Task
                                    </button>
                                </div>
                            </div>
                        </div>
                        <AlertBox alertBox={alertBox} message={alertMessage} />
                    </div>
                ))
            ) : (
                <h4>Task will be assign by Project Manager</h4>
            )}
        </>
    );
};

export default TaskList;
