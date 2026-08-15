import { useContext, useState } from "react";
import axios from "axios";
import "../css/AddRemoveSkillsPage.css";
import SkillsTable from "./components/AddRemoveSkills Components/SkillsTable";
import { AdminDatas } from "../../../context/admin/AdminContext";
import AlertBox from "../../common/AlertBox";
import alerter from "../../../features/alertAnimate/alertAnimate";

const AddRemoveSkillsPage = () => {
    const {
        getAllSkills,
        skills,
        alertBox,
        setAlertBox,
        alertMessage,
        setAlertMessage,
    } = useContext(AdminDatas);
    const [addSkill, setAddSkill] = useState({ skill: "" });

    const handleSkillAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/add_skills`,
                addSkill,
            );

            if (response.data) {
                setAddSkill({ skill: "" });
                getAllSkills();
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <div className="row">
            <h2 className="mb-3">Add / Remove Skills</h2>

            <div className="col-12 col-lg-8 mx-auto mb-5 add_remove_skills_div">
                <form
                    action=""
                    className="w-100"
                    onSubmit={handleSkillAddSubmit}
                >
                    <label htmlFor="add_skills">Add Skill:</label>
                    <input
                        type="text"
                        id="add_skills"
                        placeholder="Enter skill here:"
                        value={addSkill.skill}
                        onChange={(e) => setAddSkill({ skill: e.target.value })}
                    />
                    <button type="submit">Add Skill</button>
                </form>
            </div>

            <div className="col-12 col-lg-6 mx-auto add_remove_skills_table_div">
                <h3 className="mb-3">Available skills:</h3>

                <SkillsTable skills={skills} />
            </div>
            <AlertBox alertBox={alertBox} message={alertMessage} />
        </div>
    );
};

export default AddRemoveSkillsPage;
