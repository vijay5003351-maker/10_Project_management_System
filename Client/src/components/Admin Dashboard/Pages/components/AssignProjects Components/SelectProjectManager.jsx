import { useContext, useEffect, useState } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const SelectProjectManager = () => {
    const { allMembers } = useContext(AdminDatas);

    const [current, setCurrent] = useState("");

    useEffect(() => {
        if (allMembers) {
            setCurrent(allMembers);
        }
    }, [allMembers]);

    return (
        <>
            {current.length &&
                current
                    .filter(
                        (each) =>
                            each.Role === "Project Manager" &&
                            each.Work.status === "available",
                    )
                    .map((each) => (
                        <option value={each._id} key={each._id}>
                            {each.First_Name + " " + each.Last_Name}
                        </option>
                    ))}
        </>
    );
};

export default SelectProjectManager;
