import { useContext, useEffect, useState } from "react";
import "../css/AdminProfilePage.css";
import { MemberDatas } from "../../../context/members/MembersContext";
import axios from "axios";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";
import { AdminDatas } from "../../../context/admin/AdminContext";

const AdminProfilePage = () => {
    const { adminLogin } = useContext(MemberDatas);

    const { alertBox, alertMessage, setAlertBox, setAlertMessage } =
        useContext(AdminDatas);

    const [tempAdmin, setTempAdmin] = useState("");

    useEffect(() => {
        if (adminLogin) {
            setTempAdmin({ ...adminLogin });
        }
    }, []);

    const handleAdminProfileData = (e) => {
        const { name, value } = e.target;
        setTempAdmin({ ...tempAdmin, [name]: value });
    };

    const handleAdminDataSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/update_profile`,
                tempAdmin,
            );
            if (response.data) {
                console.log(`Profile successfully updated`);
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <div className="container-fluid">
            <h3 className="mb-3">Admin Profile</h3>

            <div className="row">
                <div className="col-12 col-lg-8 mx-auto p-3 admin_profile_div">
                    <form action="" onSubmit={handleAdminDataSubmit}>
                        <div>
                            <label htmlFor="up_email" className="mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                placeholder="Set New Email"
                                id="up_email"
                                className="mb-3"
                                value={tempAdmin?.email}
                                name="email"
                                onChange={handleAdminProfileData}
                            />
                        </div>
                        <div>
                            <label htmlFor="up_password" className="mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                placeholder="Set New Password"
                                id="up_password"
                                className="mb-3"
                                name="password"
                                value={tempAdmin?.password}
                                onChange={handleAdminProfileData}
                            />
                        </div>
                        <div>
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </div>
                <AlertBox alertBox={alertBox} message={alertMessage} />
            </div>
        </div>
    );
};

export default AdminProfilePage;
