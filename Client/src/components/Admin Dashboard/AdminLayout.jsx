import { Outlet } from "react-router-dom";

import "../Admin Dashboard/css/AdminLayout.css";
import AdminHeader from "./child components/Layout components/AdminHeader";
import AdminNavigation from "./child components/Layout components/AdminNavigation";

const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <div className="container-fluid p-3">
                <div className="row admin_main">
                    <AdminNavigation />
                    <div className="admin_content_box p-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
