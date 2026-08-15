import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const SelectDeveloper = ({ developers }) => {
    const { allMembers } = useContext(AdminDatas);
    return (
        <>
            {developers &&
                developers.map((each) => {
                    for (let i of allMembers) {
                        if (i._id === each.name) {
                            return (
                                <option
                                    value={each.name}
                                    key={each.name}
                                >{`${i.First_Name} ${i.Last_Name}`}</option>
                            );
                        }
                    }
                })}
        </>
    );
};

export default SelectDeveloper;
