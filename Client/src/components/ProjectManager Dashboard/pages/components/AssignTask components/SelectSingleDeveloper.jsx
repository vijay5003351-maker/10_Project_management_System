import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const SelectSingleDeveloper = ({ devName }) => {
    const { allMembers } = useContext(AdminDatas);

    return (
        <>
            {allMembers.length &&
                allMembers
                    .filter((each) => each._id === devName)
                    .map((person) => (
                        <span
                            key={person._id}
                        >{`${person.First_Name} ${person.Last_Name}`}</span>
                    ))}
        </>
    );
};

export default SelectSingleDeveloper;
