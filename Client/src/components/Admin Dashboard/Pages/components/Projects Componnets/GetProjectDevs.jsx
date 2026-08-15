import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const GetProjectDevs = ({ developers }) => {
    const { allMembers } = useContext(AdminDatas);
    return (
        <>
            {developers.length ? (
                allMembers.map((ele, index) => {
                    for (let person of developers) {
                        if (ele._id === person.name)
                            return (
                                <p
                                    key={index}
                                >{`${ele.First_Name} ${ele.Last_Name}`}</p>
                            );
                    }
                })
            ) : (
                <h2>Loading...</h2>
            )}
        </>
    );
};

export default GetProjectDevs;
