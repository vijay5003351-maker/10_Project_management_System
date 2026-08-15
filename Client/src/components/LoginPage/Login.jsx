import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDatas } from "../../context/login/LoginContext";
import "./Login.css";

const Login = () => {
    const {
        handleLoginFormValue,
        handleLoginSubmit,
        loginUser,
        dev,
        setDev,
        PM,
        setPM,
        admin,
        setAdmin,
    } = useContext(LoginDatas);

    const navigate = useNavigate();
    return (
        <div className="container-fluid login_div">
            <div
                style={{
                    position: "absolute",
                    top: 0,
                }}
                className="p-2"
            >
                <h5>Admin Credentials</h5>
                <p>Email: admin@mail.com</p>
                <p>Password: 123456</p>
            </div>
            <div className="row p-3">
                <section className="col d-none d-xl-block"></section>
                <section className="col login_section">
                    {/* welcome card */}
                    <div className="login_form_holder_div">
                        <article className="row welcome_div">
                            <div className="text-center col-11">
                                <h1>Project Management System</h1>
                            </div>
                        </article>
                        {/* login form */}
                        <article className="row">
                            <div className="col-12 col-lg-8">
                                <form
                                    action=""
                                    onSubmit={(e) => {
                                        handleLoginSubmit(e, navigate);
                                    }}
                                >
                                    <div>
                                        <label htmlFor="email" className="mb-2">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email:"
                                            value={loginUser.email}
                                            onChange={handleLoginFormValue}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2"
                                        >
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password:"
                                            value={loginUser.password}
                                            minLength={6}
                                            onChange={handleLoginFormValue}
                                            required
                                        />
                                    </div>
                                    <div className="sign_in_type d-flex flex-wrap gap-3">
                                        <div>
                                            <input
                                                type="radio"
                                                id="Admin"
                                                name="login_person"
                                                checked={admin}
                                                onChange={() => {
                                                    setAdmin(true);
                                                    setPM(false);
                                                    setDev(false);
                                                }}
                                            />
                                            <label htmlFor="Admin">Admin</label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="Developer"
                                                name="login_person"
                                                checked={dev}
                                                onChange={() => {
                                                    setDev(true);
                                                    setPM(false);
                                                    setAdmin(false);
                                                }}
                                            />
                                            <label htmlFor="Developer">
                                                Developer
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="Project Manager"
                                                name="login_person"
                                                checked={PM}
                                                onChange={() => {
                                                    setPM(true);
                                                    setDev(false);
                                                    setAdmin(false);
                                                }}
                                            />
                                            <label htmlFor="Project Manager">
                                                Project Manager
                                            </label>
                                        </div>
                                    </div>

                                    <div className="login_btn_div pb-5">
                                        <button
                                            type="submit"
                                            className="login_btn"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login;
