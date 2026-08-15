import { useContext, useState } from "react";
import { AdminDatas } from "../../../context/admin/AdminContext";
import "../css/ViewMembersPage.css";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const ViewMembersPage = () => {
    const {
        allMembers,
        getAllMembers,
        alertBox,
        setAlertBox,
        alertMessage,
        setAlertMessage,
    } = useContext(AdminDatas);

    const [delPerson, setDelPerson] = useState({});

    const [popState, setPopState] = useState(false);

    const handleMemberDelete = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/delete_member`,
                delPerson,
            );

            if (response.data) {
                getAllMembers();
                setPopState(false);
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="row">
            <h2 className="mb-3">View Members</h2>
            <div className="view_members_div">
                <table className="view_members_table">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>Email</th>
                            <th>Phone no</th>
                            <th>Role</th>
                            <th>Skills</th>
                            <th>Address</th>
                            <th>Working status</th>
                            <th>Delete Member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMembers.length ? (
                            allMembers
                                .filter((each) => each.Work.status !== "drop")
                                .map((each) => (
                                    <tr key={each._id}>
                                        <td>
                                            {each.First_Name} {each.Last_Name}
                                        </td>

                                        <td>{each.Email}</td>
                                        <td>{each.Phone_no}</td>
                                        <td>{each.Role}</td>
                                        <td>{each.Skill}</td>
                                        <td>{each.Address}</td>
                                        <td>
                                            {each.Work.status ===
                                            "available" ? (
                                                <h6 className="text-success">
                                                    {each.Work.status}
                                                </h6>
                                            ) : (
                                                <h6 className="text-danger">
                                                    {each.Work.status}
                                                </h6>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="member_delete_btn"
                                                onClick={() => {
                                                    setDelPerson({
                                                        userName: `${each.First_Name} ${each.Last_Name}`,
                                                        id: each._id,
                                                    });
                                                    setPopState(true);
                                                }}
                                                disabled={
                                                    each.Work.status ===
                                                    "available"
                                                        ? false
                                                        : true
                                                }
                                            >
                                                Delete <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <span style={{ fontSize: "1.5rem" }}>
                                List is empty
                            </span>
                        )}
                    </tbody>
                </table>
            </div>

            {popState && <div className="pop_outer"></div>}
            <div className={popState ? "delete_popup present" : "delete_popup"}>
                <div className="mb-3">
                    <h5>
                        Are you Sure want to delete {`${delPerson?.userName}`}
                    </h5>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button onClick={() => setPopState(false)}>Cancel</button>
                    <button onClick={handleMemberDelete}>Ok</button>
                </div>
            </div>

            <AlertBox alertBox={alertBox} message={alertMessage} />
        </div>
    );
};

export default ViewMembersPage;
