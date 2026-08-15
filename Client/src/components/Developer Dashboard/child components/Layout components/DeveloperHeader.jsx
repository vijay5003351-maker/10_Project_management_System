import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoLogOutOutline, IoOptionsSharp } from "react-icons/io5";
import "../../../Admin Dashboard/css/AdminHeader.css";
import { MemberDatas } from "../../../../context/members/MembersContext";
import { AdminDatas } from "../../../../context/admin/AdminContext";

const DeveloperHeader = () => {
    const { toggle, setToggle, allMembers } = useContext(AdminDatas);
    const { loginMember } = useContext(MemberDatas);

    const [member, setMember] = useState("");

    useEffect(() => {
        if (loginMember && allMembers) {
            const temp = allMembers.filter(
                (each) => each._id === loginMember._id,
            );
            setMember(temp[0]);
        }
    }, [allMembers]);

    const handleLogoutButton = () => {
        localStorage.removeItem("userToken");
        alert(`Logout successful`);
    };
    return (
        <div className="container-fluid p-3">
            <header className="admin_header py-2 px-3">
                <nav className="admin_nav">
                    <ul>
                        <li className="d-flex gap-2 align-items-center">
                            <p
                                className="d-xl-none"
                                onClick={() => setToggle(!toggle)}
                            >
                                {toggle ? <IoClose /> : <IoOptionsSharp />}
                            </p>
                            <p className="d-flex gap-3 align-items-center">
                                <span className="d-none d-xl-block header_greet">
                                    Hello,
                                </span>
                                <span className="header_person_span">{` ${member.First_Name} 
                            ${member.Last_Name}`}</span>
                            </p>
                        </li>
                        <li>
                            <Link to="/login">
                                <button onClick={handleLogoutButton}>
                                    <IoLogOutOutline />
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default DeveloperHeader;
