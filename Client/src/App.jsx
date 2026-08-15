import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/LoginPage/Login";
import LoginContext from "./context/login/LoginContext";
import PageRedirect from "./components/PageRedirect.js/PageRedirect";
import axios from "axios";

function App() {
    async function setAdminNameAndPass() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API_URL}/admin/set_admin`,
            );
            if (response) {
                console.log(`Admin default is added`);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        setAdminNameAndPass();
    }, []);
    // user Token
    const [token, setToken] = useState("");

    const AuthenticLogin = ({ children }) => {
        return token ? children : <Navigate to="/login" />;
    };
    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginContext setToken={setToken}>
                                <Login />
                            </LoginContext>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <AuthenticLogin>
                                <PageRedirect />
                            </AuthenticLogin>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
