import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MembersContext from "./context/members/MembersContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MembersContext>
            <App />
        </MembersContext>
    </StrictMode>,
);
