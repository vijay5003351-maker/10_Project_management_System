import { Outlet } from "react-router-dom";

import "../Admin Dashboard/css/AdminLayout.css";
import DeveloperHeader from "./child components/Layout components/DeveloperHeader";
import DeveloperNavigation from "./child components/Layout components/DeveloperNavigation";

const DeveloperLayout = () => {
    return (
        <div>
            <DeveloperHeader />
            <div className="container-fluid p-3">
                <div className="row admin_main">
                    <DeveloperNavigation />
                    <div className="admin_content_box p-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperLayout;
