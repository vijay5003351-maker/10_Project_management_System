import { Routes, Route } from "react-router-dom";
import DeveloperLayout from "./DeveloperLayout";
import AdminContext from "../../context/admin/AdminContext";
import SingleProjectPage from "../Admin Dashboard/Pages/SingleProjectPage";
import ManagerProjectsPage from "../ProjectManager Dashboard/pages/ManagerProjectsPage";
import MyTaskPage from "./pages/MyTaskPage";
import DevProfilePage from "./pages/DevProfilePage";
import DevDashboard from "./pages/DevDashboard";

const DeveloperPage = () => {
    return (
        <div>
            <AdminContext>
                <Routes>
                    <Route path="/developer" element={<DeveloperLayout />}>
                        <Route index element={<DevDashboard />} />
                        <Route path="current_project">
                            <Route path=":id" element={<SingleProjectPage />} />
                        </Route>
                        <Route path="my_all_projects">
                            <Route index element={<ManagerProjectsPage />} />
                            <Route path=":id" element={<SingleProjectPage />} />
                        </Route>
                        <Route path="my_tasks">
                            <Route path=":id" element={<MyTaskPage />} />
                        </Route>
                        <Route path="my_profile" element={<DevProfilePage />} />
                    </Route>
                </Routes>
            </AdminContext>
        </div>
    );
};

export default DeveloperPage;
