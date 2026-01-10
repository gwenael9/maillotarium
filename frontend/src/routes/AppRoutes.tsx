import AppLayout from "@/layout/AppLayout";
import TeamDetails from "@/pages/TeamDetails";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./routes";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route element={<AppLayout />}>
                <Route path={ROUTES.home} element={<div>App Content</div>} />
                <Route path={ROUTES.country} element={<div>Country Content</div>} />
                <Route path={ROUTES.teams} element={<div>Teams Content</div>} />
                <Route path={ROUTES.teamsDetails} element={<TeamDetails />} />
            </Route>
            <Route path={ROUTES.notFound} element={<div>Not Found Content</div>} />
        </Routes>
    </Router>
)

export default AppRoutes;