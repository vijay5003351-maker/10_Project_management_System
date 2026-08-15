import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AddMembersPage from "./Pages/AddMembersPage";
import AdminContext from "../../context/admin/AdminContext";
import ViewMembersPage from "./Pages/ViewMembersPage";
import AddRemoveSkillsPage from "./Pages/AddRemoveSkillsPage";
import AssignProjectsPage from "./Pages/AssignProjectsPage";
import ProjectsPage from "./Pages/ProjectsPage";
import SingleProjectPage from "./Pages/SingleProjectPage";
import SubmittedProjectsPage from "./Pages/SubmittedProjectsPage";
import AdminProfilePage from "./Pages/AdminProfilePage";
import AdminDashboard from "./Pages/AdminDashboard";

const AdminPage = () => {
    return (
        <div>
            <AdminContext>
                <Routes>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route
                            path="add_members"
                            element={<AddMembersPage />}
                        />
                        <Route
                            path="view_members"
                            element={<ViewMembersPage />}
                        />
                        <Route
                            path="add_remove_skills"
                            element={<AddRemoveSkillsPage />}
                        />
                        <Route
                            path="assign_projects"
                            element={<AssignProjectsPage />}
                        />
                        <Route path="view_projects">
                            <Route index element={<ProjectsPage />} />
                            <Route path=":id" element={<SingleProjectPage />} />
                        </Route>
                        <Route
                            path="submitted_projects"
                            element={<SubmittedProjectsPage />}
                        />
                        <Route
                            path="admin_profile"
                            element={<AdminProfilePage />}
                        />
                    </Route>
                </Routes>
            </AdminContext>
        </div>
    );
};

export default AdminPage;
