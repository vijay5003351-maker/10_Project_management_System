import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const GetProjectManager = ({ managerId }) => {
    const { allMembers } = useContext(AdminDatas);
    return (
        <>
            {allMembers.map((ele) => {
                if (ele._id === managerId)
                    return (
                        <p
                            key={ele._id}
                        >{`${ele.First_Name} ${ele.Last_Name}`}</p>
                    );
            })}
        </>
    );
};

export default GetProjectManager;
