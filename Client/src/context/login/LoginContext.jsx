import { createContext, useContext, useState } from "react";
import axios from "axios";
import { MemberDatas } from "../members/MembersContext";

// eslint-disable-next-line react-refresh/only-export-components
export const LoginDatas = createContext();

const LoginContext = ({ children, setToken }) => {
    const { setLoginMember, setAdminLogin } = useContext(MemberDatas);

    // store changing login value
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });

    // handle changing form value
    const handleLoginFormValue = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    };

    // store login person

    const [dev, setDev] = useState(false);
    const [PM, setPM] = useState(false);
    const [admin, setAdmin] = useState(false);

    // login submit
    const handleLoginSubmit = async (e, navigate) => {
        e.preventDefault();

        if (dev) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_API_URL}/login/dev`,
                    loginUser,
                );

                console.log(response.data);

                if (response) {
                    console.log(response.data.message);

                    const userId = response.data.userDev._id;

                    setToken(userId);
                    localStorage.setItem("userToken", userId);

                    setLoginMember(response.data.userDev);
                    alert(response.data.message);
                    navigate("/developer");
                }
            } catch (err) {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            }

            return;
        }
        if (PM) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_REACT_API_URL}/login/PM`,
                    loginUser,
                );

                if (response.data) {
                    const userId = response.data.userPM._id;

                    setToken(userId);
                    localStorage.setItem("userToken", userId);

                    setLoginMember(response.data.userPM);
                    alert(response.data.message);
                    navigate("/project_manager");
                }
            } catch (err) {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            }

            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/login/admin`,
                loginUser,
            );

            if (response.data) {
                const userId = response.data.userEmail._id;

                setToken(userId);
                localStorage.setItem("userToken", userId);
                setAdminLogin({
                    id: userId,
                    email: response.data.userEmail.email,
                    password: response.data.userEmail.password,
                });
                alert(response.data.message);
                navigate("/admin");
            }
        } catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    };

    return (
        <LoginDatas.Provider
            value={{
                handleLoginFormValue,
                handleLoginSubmit,
                loginUser,
                dev,
                setDev,
                PM,
                setPM,
                admin,
                setAdmin,
            }}
        >
            {children}
        </LoginDatas.Provider>
    );
};

export default LoginContext;
