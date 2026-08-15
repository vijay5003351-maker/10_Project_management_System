import { useContext } from "react";
import "../../../css/SkillsTable.css";
import { FaTrash } from "react-icons/fa";
import { AdminDatas } from "../../../../../context/admin/AdminContext";
import axios from "axios";
import alerter from "../../../../../features/alertAnimate/alertAnimate";

const SkillsTable = ({ skills }) => {
    const { getAllSkills, setAlertBox, setAlertMessage } =
        useContext(AdminDatas);

    const deleteSkill = async (skill_id) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/remove_skill`,
                { skill_id },
            );
            if (response.data) {
                getAllSkills();
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="skills_outer_div">
            {skills ? (
                skills.map((skill) => (
                    <div
                        className="p-3  d-flex justify-content-between align-items-center skills_inner_div"
                        key={skill._id}
                    >
                        {skill.skill}
                        <FaTrash
                            onClick={() => deleteSkill(skill._id)}
                            className="available_skills"
                        />
                    </div>
                ))
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
};

export default SkillsTable;
