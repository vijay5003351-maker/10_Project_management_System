import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const ProjectsDetailsPM = ({ assignProject }) => {
    const { allMembers } = useContext(AdminDatas);
    return (
        <>
            {assignProject.project_manager !== "" ? (
                allMembers.map((ele) => {
                    if (ele._id === assignProject.project_manager)
                        return (
                            <p
                                key={ele._id}
                            >{`${ele.First_Name} ${ele.Last_Name}`}</p>
                        );
                })
            ) : (
                <p>add project manager</p>
            )}
        </>
    );
};

export default ProjectsDetailsPM;
