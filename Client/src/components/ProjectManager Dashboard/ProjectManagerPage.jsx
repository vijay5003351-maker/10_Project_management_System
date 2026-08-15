import { Routes, Route } from "react-router-dom";
import ProjectManagerLayout from "./ProjectManagerLayout";
import AdminContext from "../../context/admin/AdminContext";
import SingleProjectPage from "../Admin Dashboard/Pages/SingleProjectPage";
import ManagerProjectsPage from "./pages/ManagerProjectsPage";
import AssignTaskPage from "./pages/AssignTaskPage";
import SubmittedTaskPage from "./pages/SubmittedTaskPage";
import DevProfilePage from "../Developer Dashboard/pages/DevProfilePage";
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard";

const ProjectManagerPage = () => {
    return (
        <div>
            <AdminContext>
                <Routes>
                    <Route
                        path="/project_manager"
                        element={<ProjectManagerLayout />}
                    >
                        <Route index element={<ProjectManagerDashboard />} />
                        <Route path="current_project">
                            <Route path=":id" element={<SingleProjectPage />} />
                        </Route>

                        <Route path="my_all_projects">
                            <Route index element={<ManagerProjectsPage />} />
                            <Route path=":id" element={<SingleProjectPage />} />
                        </Route>

                        <Route path="assign_task">
                            <Route path=":id" element={<AssignTaskPage />} />
                        </Route>
                        <Route path="submitted_task">
                            <Route path=":id" element={<SubmittedTaskPage />} />
                        </Route>
                        <Route path="my_profile" element={<DevProfilePage />} />
                    </Route>
                </Routes>
            </AdminContext>
        </div>
    );
};

export default ProjectManagerPage;
