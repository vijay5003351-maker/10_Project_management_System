import { useContext } from "react";
import SelectSingleDeveloper from "../AssignTask components/SelectSingleDeveloper";

import "../../../css/SubmitSingleTask.css";
import axios from "axios";
import { AdminDatas } from "../../../../../context/admin/AdminContext";
import alerter from "../../../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../../../common/AlertBox";

const SubmitSingleTask = ({ reqList, myProject }) => {
    // waiting for response || pending || completed . (For dev side)
    // submitted || completed || rejected (For PM side)
    const {
        getAllProjects,
        calculatePercent,
        setAlertBox,
        setAlertMessage,
        alertBox,
        alertMessage,
    } = useContext(AdminDatas);

    const handleManagerResponse = async (value, task_id, personId) => {
        let myObject;
        const obj = myProject.project_members.developers.filter(
            (each) => each.name === personId,
        );
        myObject = obj[0];

        let current_task = {};
        const tempTaskListArray = myObject.task_list.map((each) => {
            if (each.task_id === task_id) {
                current_task = {
                    ...each,
                    status: value === "rejected" ? "pending" : "completed",
                };
                return {
                    ...each,
                    status: value === "rejected" ? "pending" : "completed",
                };
            } else {
                return each;
            }
        });

        const tempDevArray = myProject.project_members.developers.map(
            (each) => {
                if (each.name === personId) {
                    return { ...each, task_list: tempTaskListArray };
                } else {
                    return each;
                }
            },
        );

        let tempReqArray;

        tempReqArray = myProject.request_list.map((each) => {
            if (each.task.task_id === task_id && each.status === "submitted") {
                return {
                    ...each,
                    task: current_task,
                    status: value,
                    visit: "seen",
                };
            } else {
                return each;
            }
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/project_manager/update_dev_reqArray`,
                { myProject, tempDevArray, tempReqArray },
            );

            if (response.data) {
                console.log("Successfully updated the project status");

                const res = await getAllProjects();
                if (res) {
                    calculatePercent(myProject._id, personId);
                }

                setAlertMessage("Project status successfully updated");
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <>
            {reqList.length ? (
                reqList.map((each, index) => (
                    <div
                        key={index}
                        className="d-flex gap-2 flex-wrap mb-3 submit_request_list"
                    >
                        <div>
                            <h6>Dev Name:</h6>
                            <p>
                                <SelectSingleDeveloper devName={each.name} />
                            </p>
                        </div>
                        <div className="req_task">
                            <h6>Task:</h6>
                            <p>{each.task.task}</p>
                        </div>
                        <div>
                            <h6>Status:</h6>
                            <p>{each.status}</p>
                        </div>
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="req_reject_btn"
                                value="rejected"
                                disabled={
                                    each.status === "submitted" ? false : true
                                }
                                onClick={(e) => {
                                    handleManagerResponse(
                                        e.target.value,
                                        each.task.task_id,
                                        each.name,
                                    );
                                }}
                            >
                                Reject
                            </button>
                            <button
                                type="button"
                                className="req_complete_btn"
                                value="completed"
                                disabled={
                                    each.status === "submitted" ? false : true
                                }
                                onClick={(e) => {
                                    handleManagerResponse(
                                        e.target.value,
                                        each.task.task_id,
                                        each.name,
                                    );
                                }}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h4>List is empty</h4>
            )}
            <AlertBox alertBox={alertBox} message={alertMessage} />
        </>
    );
};

export default SubmitSingleTask;
