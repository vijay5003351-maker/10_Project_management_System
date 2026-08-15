import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const SelectSkills = () => {
    const { skills } = useContext(AdminDatas);
    return (
        <>
            {skills &&
                skills.map((skill) => (
                    <option value={skill.skill} key={skill._id}>
                        {skill.skill}
                    </option>
                ))}
        </>
    );
};

export default SelectSkills;
