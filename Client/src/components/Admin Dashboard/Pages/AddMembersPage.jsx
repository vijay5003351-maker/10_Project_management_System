import { useContext } from "react";
import { AdminDatas } from "../../../context/admin/AdminContext";
import "../css/AddMembersPage.css";
import SelectSkills from "./components/AddMembers Components/SelectSkills";
import AlertBox from "../../common/AlertBox";

const AddMembersPage = () => {
    const {
        newMember,
        handleNewMemberValue,
        handleAddMemberSubmit,
        alertBox,
        alertMessage,
    } = useContext(AdminDatas);
    return (
        <div className="row">
            <h2 className="mb-3">Add Members</h2>
            <form
                action=""
                className="add_members_form"
                onSubmit={handleAddMemberSubmit}
            >
                <div className="row mb-3">
                    <div className="col-12 col-lg">
                        <label htmlFor="First_Name">First Name:</label>
                        <input
                            type="text"
                            id="First_Name"
                            name="First_Name"
                            placeholder="Enter your First Name"
                            value={newMember.First_Name}
                            onChange={handleNewMemberValue}
                            required
                        />
                    </div>
                    <div className="col-12 col-lg">
                        <label htmlFor="Last_Name">Last Name:</label>
                        <input
                            type="text"
                            id="Last_Name"
                            name="Last_Name"
                            placeholder="Enter your Last Name"
                            value={newMember.Last_Name}
                            onChange={handleNewMemberValue}
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
                            value={newMember.Email}
                            onChange={handleNewMemberValue}
                            required
                        />
                    </div>
                    <div className="col-12 col-sm">
                        <label htmlFor="Password">Password:</label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            placeholder="Enter your Password"
                            value={newMember.Password}
                            onChange={handleNewMemberValue}
                            minLength={6}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-sm">
                        <label htmlFor="Age">Age:</label>
                        <input
                            type="number"
                            id="Age"
                            name="Age"
                            placeholder="Enter your Age"
                            value={newMember.Age}
                            onChange={handleNewMemberValue}
                            required
                        />
                    </div>
                    <div className="col-12 col-sm">
                        <label htmlFor="Phone_no">Phone no:</label>
                        <input
                            type="number"
                            id="Phone_no"
                            name="Phone_no"
                            placeholder="Enter your Phone_no"
                            value={newMember.Phone_no}
                            onChange={handleNewMemberValue}
                            required
                        />
                    </div>
                    <div className="col-12 col-sm">
                        <label htmlFor="Address">Address:</label>
                        <input
                            type="text"
                            id="Address"
                            name="Address"
                            placeholder="Enter your Address"
                            value={newMember.Address}
                            onChange={handleNewMemberValue}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-sm">
                        <label htmlFor="Role">Role:</label>
                        <select
                            name="Role"
                            id="Role"
                            value={newMember.Role}
                            onChange={handleNewMemberValue}
                        >
                            <option value="">---Select Role---</option>
                            <option value="Project Manager">
                                Project Manager
                            </option>
                            <option value="Developer">Developer</option>
                        </select>
                    </div>
                    <div className="col-12 col-sm">
                        <label htmlFor="Skill">Skill:</label>
                        <select
                            name="Skill"
                            id="Skill"
                            value={newMember.Skill}
                            onChange={handleNewMemberValue}
                        >
                            <option value="">---Select Skill---</option>
                            <SelectSkills />
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit" className="add_member_btn">
                        Add Member
                    </button>
                </div>
            </form>
            <AlertBox alertBox={alertBox} message={alertMessage} />
        </div>
    );
};

export default AddMembersPage;
