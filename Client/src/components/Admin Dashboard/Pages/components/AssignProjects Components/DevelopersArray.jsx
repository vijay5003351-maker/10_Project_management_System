import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const DevelopersArray = ({ developers }) => {
    const { allMembers } = useContext(AdminDatas);

    const constructDevelopers = () => {
        const arr = developers.map((dev) => {
            for (let person of allMembers) {
                if (dev == person._id) {
                    return person;
                }
            }
        });

        return arr.map((each, index) => (
            <h6 className="text-muted" key={index}>
                {each.First_Name + " " + each.Last_Name}
            </h6>
        ));
    };
    return (
        <>
            {developers.length ? (
                constructDevelopers()
            ) : (
                <h6 className="text-muted">---Select Developers---</h6>
            )}
            {}
        </>
    );
};

export default DevelopersArray;
