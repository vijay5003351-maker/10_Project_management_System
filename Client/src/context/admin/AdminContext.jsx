import { createContext, useEffect, useState } from "react";

import axios from "axios";
import alerter from "../../features/alertAnimate/alertAnimate";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminDatas = createContext();

const AdminContext = ({ children }) => {
    // Get all members

    const [allMembers, setAllMembers] = useState("");

    async function getAllMembers() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/get`,
            );
            if (response.data) {
                setAllMembers(response.data.allMembers.reverse());
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllMembers();
    }, []);

    // Get all projects

    const [projects, setProjects] = useState("");

    async function getAllProjects() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/get_projects`,
            );

            if (response.data) {
                setProjects(response.data.allProjects.reverse());
            }
        } catch (err) {
            console.log(err.message);
        }

        return true;
    }

    useEffect(() => {
        getAllProjects();
    }, []);

    // get all skills
    const [skills, setSkills] = useState("");

    async function getAllSkills() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/get_all_skills`,
            );
            if (response.data.allSkills) {
                setSkills(response.data.allSkills.reverse());
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllSkills();
    }, []);

    // alert box state
    const [alertBox, setAlertBox] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    // add member state
    const [newMember, setNewMember] = useState({
        First_Name: "",
        Last_Name: "",
        Email: "",
        Password: "",
        Age: "",
        Phone_no: "",
        Address: "",
        Role: "",
        Skill: "",
        Work: {
            status: "available",
            currentProjectId: "null",
        },
    });

    // handle member value
    const handleNewMemberValue = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    // handle add members form submit

    const handleAddMemberSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/add_members`,
                newMember,
            );

            if (response.data) {
                console.log("Member successfully added");
                getAllMembers();
                if (response.data.message) {
                    setNewMember({
                        First_Name: "",
                        Last_Name: "",
                        Email: "",
                        Password: "",
                        Age: "",
                        Phone_no: "",
                        Address: "",
                        Role: "",
                        Skill: "",
                        Work: {
                            status: "available",
                        },
                    });
                }

                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
            setAlertMessage(err.response.data.message);
            alerter(setAlertBox);
        }
    };

    // handle progress percentage

    const calculatePercent = async (projectId, personId) => {
        let myProject;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/get_projects`,
            );

            if (response.data) {
                let allProjects = response.data.allProjects;
                myProject = allProjects.filter(
                    (each) => each._id === projectId,
                );
            }
        } catch (err) {
            console.log(err.message);
        }

        console.log(myProject[0]);

        let tempPercentArr = [];
        const tempDevArr = myProject[0].project_members.developers.map(
            (each) => {
                if (each.name === personId) {
                    each.task_list.map((each) => {
                        each.status === "completed"
                            ? tempPercentArr.push(100)
                            : tempPercentArr.push(0);
                    });
                    let totalPercent = totalPercentAdder(tempPercentArr);

                    let finalPercent = finalPercentCalculator(
                        totalPercent,
                        tempPercentArr,
                    );

                    return {
                        ...each,
                        progress: {
                            ...each.progress,
                            percent: Math.floor(finalPercent),
                            totalProgress:
                                finalPercent === 100 ? "completed" : "pending",
                        },
                    };
                } else {
                    return each;
                }
            },
        );

        let tempProjectPercent = [];

        tempDevArr.forEach((each) => {
            tempProjectPercent.push(each.progress.percent);
        });

        let totalPercent = totalPercentAdder(tempProjectPercent);

        let finalPercent = finalPercentCalculator(
            totalPercent,
            tempProjectPercent,
        );

        const project_manager = {
            ...myProject[0].project_members.project_manager,
            progress: {
                ...myProject[0].project_members.project_manager.progress,
                percent: Math.floor(finalPercent),
                totalProgress:
                    finalPercent === 100 ? "Project Finished" : "pending",
            },
        };

        percentUpdater(tempDevArr, project_manager, myProject);
    };

    async function percentUpdater(tempDevArr, project_manager, myProject) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/project_manager/update_percent`,
                { tempDevArr, project_manager, myProject },
            );
            if (response.data) {
                console.log(response.data.message);
                getAllProjects();
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    // Total percent Address by all developers task.
    function totalPercentAdder(arr) {
        const totalPercent = arr.reduce((prev, current) => prev + current, 0);

        return totalPercent;
    }

    // final percent calculator for project progress.

    function finalPercentCalculator(totalPercent, tempPercentArr) {
        const finalPercent =
            (totalPercent / (tempPercentArr.length * 100)) * 100;
        return finalPercent;
    }

    // toggle state

    const [toggle, setToggle] = useState(false);

    return (
        <AdminDatas.Provider
            value={{
                newMember,
                handleNewMemberValue,
                handleAddMemberSubmit,
                allMembers,
                skills,
                getAllSkills,
                projects,
                getAllProjects,
                getAllMembers,
                calculatePercent,
                toggle,
                setToggle,
                alertBox,
                setAlertBox,
                alertMessage,
                setAlertMessage,
            }}
        >
            {children}
        </AdminDatas.Provider>
    );
};

export default AdminContext;
