import { useContext, useEffect, useState } from "react";
import { MemberDatas } from "../../../context/members/MembersContext";
import "../css/DevProfilePage.css";
import axios from "axios";
import { AdminDatas } from "../../../context/admin/AdminContext";
import alerter from "../../../features/alertAnimate/alertAnimate";
import AlertBox from "../../common/AlertBox";

const DevProfilePage = () => {
    const { loginMember } = useContext(MemberDatas);
    const {
        getAllMembers,
        setAlertBox,
        alertBox,
        setAlertMessage,
        alertMessage,
        allMembers,
    } = useContext(AdminDatas);

    const [personDetail, setPersonDetail] = useState({
        First_Name: "",
        Last_Name: "",
        Age: "",
        Address: "",
        Phone_no: "",
        Email: "",
        Password: "",
    });

    useEffect(() => {
        if (loginMember && allMembers) {
            const temp = allMembers.filter(
                (each) => each._id === loginMember._id,
            );

            setPersonDetail({ ...temp[0] });
        }
    }, []);

    const handleDevProfileData = (e) => {
        const { name, value } = e.target;
        setPersonDetail({ ...personDetail, [name]: value });
    };

    const submitDevProfileData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/developer/update_profile`,
                personDetail,
            );
            if (response.data) {
                console.log(response.data.message);
                getAllMembers();
                setAlertMessage(response.data.message);
                alerter(setAlertBox);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-fluid">
            <h3 className="mb-3">My Profile</h3>
            <div className="Dev_profile_div p-3">
                <form
                    action=""
                    className="row add_members_form"
                    onSubmit={submitDevProfileData}
                >
                    <div className="row my-3">
                        <div className="col-12 col-md">
                            <label htmlFor="First_Name">First Name:</label>
                            <input
                                type="text"
                                id="First_Name"
                                name="First_Name"
                                placeholder="Enter your First Name"
                                value={personDetail.First_Name}
                                onChange={handleDevProfileData}
                            />
                        </div>
                        <div className="col-12 col-md">
                            <label htmlFor="Last_Name">Last Name:</label>
                            <input
                                type="text"
                                id="Last_Name"
                                name="Last_Name"
                                placeholder="Enter your Last Name"
                                value={personDetail.Last_Name}
                                onChange={handleDevProfileData}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-sm">
                            <label htmlFor="Email">Email:</label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                placeholder="Enter your Email"
                                value={personDetail.Email}
                                onChange={handleDevProfileData}
                            />
                        </div>
                        <div className="col-12 col-sm">
                            <label htmlFor="Password">Password:</label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                                placeholder="Enter your Password"
                                value={personDetail.Password}
                                onChange={handleDevProfileData}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md">
                            <label htmlFor="Age">Age:</label>
                            <input
                                type="text"
                                id="Age"
                                name="Age"
                                placeholder="Enter your Age"
                                value={personDetail.Age}
                                onChange={handleDevProfileData}
                            />
                        </div>
                        <div className="col-12 col-md">
                            <label htmlFor="Phone_no">Phone no:</label>
                            <input
                                type="number"
                                id="Phone_no"
                                name="Phone_no"
                                placeholder="Enter your Phone_no"
                                value={personDetail.Phone_no}
                                onChange={handleDevProfileData}
                            />
                        </div>
                        <div className="col-12 col-md">
                            <label htmlFor="Address">Address:</label>
                            <input
                                type="text"
                                id="Address"
                                name="Address"
                                placeholder="Enter your Address"
                                value={personDetail.Address}
                                onChange={handleDevProfileData}
                            />
                        </div>

                        <div>
                            <button type="submit" className="dev_update_btn">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <AlertBox alertBox={alertBox} message={alertMessage} />
        </div>
    );
};

export default DevProfilePage;
