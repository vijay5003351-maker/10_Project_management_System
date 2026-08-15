import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const ProjectDetailsDev = ({ assignProject }) => {
    const { allMembers } = useContext(AdminDatas);
    return (
        <>
            {assignProject.developers.length ? (
                allMembers.map((ele, index) => {
                    for (let dev of assignProject.developers) {
                        if (ele._id === dev)
                            return (
                                <p
                                    key={index}
                                >{`${ele.First_Name} ${ele.Last_Name}`}</p>
                            );
                    }
                })
            ) : (
                <p>add developers</p>
            )}
        </>
    );
};

export default ProjectDetailsDev;
