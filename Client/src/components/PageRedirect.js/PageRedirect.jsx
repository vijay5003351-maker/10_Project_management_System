import AdminPage from "../Admin Dashboard/AdminPage";
import ProjectManagerPage from "../ProjectManager Dashboard/ProjectManagerPage";
import DeveloperPage from "../Developer Dashboard/DeveloperPage";

const PageRedirect = () => {
    return (
        <div>
            <AdminPage />
            <ProjectManagerPage />
            <DeveloperPage />
        </div>
    );
};

export default PageRedirect;
