import { useContext } from "react";
import { AdminDatas } from "../../../../../context/admin/AdminContext";

const DevelopersBox = ({ singleProject }) => {
    const { allMembers } = useContext(AdminDatas);

    const renderedName = (name) => {
        const person = allMembers.filter((each) => each._id === name);
        return `${person[0].First_Name} ${person[0].Last_Name}`;
    };

    return (
        <>
            {singleProject &&
                singleProject.project_members.developers.map((each, index) => (
                    <div className="mb-3 p-3 single_dev_div" key={index}>
                        <h5 className="mb-3">{renderedName(each.name)}</h5>
                        <h6 className="mb-1">
                            Progress: {each.progress.percent}%
                        </h6>
                        <div
                            style={{
                                height: "5px",
                                width: `${each.progress.percent}%`,
                                backgroundColor: "red",
                                borderRadius: "5px",
                            }}
                            className="mb-3"
                        ></div>

                        <div className="d-flex gap-2 flex-wrap">
                            <p>Project Status :</p>
                            <p>{each.progress.totalProgress}</p>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default DevelopersBox;
