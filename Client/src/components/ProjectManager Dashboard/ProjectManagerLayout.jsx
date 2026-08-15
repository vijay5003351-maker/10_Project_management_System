import { Outlet } from "react-router-dom";
import ProjectManagerHeader from "./child components/Layout components/ProjectManagerHeader";
import ProjectManagerNavigation from "./child components/Layout components/ProjectManagerNavigation";
import "../Admin Dashboard/css/AdminLayout.css";

const ProjectManagerLayout = () => {
    return (
        <div>
            <ProjectManagerHeader />
            <div className="container-fluid p-3">
                <div className="row admin_main">
                    <ProjectManagerNavigation />
                    <div className="admin_content_box p-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManagerLayout;
