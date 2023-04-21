import { Config } from "./Config";
import { Registration } from "../screens/registration/Registration";
import { NotFound } from "../screens/notFound/NotFound";
import { Dashboard } from "../screens/dashboard/Dashboard";
import { Logout } from "../screens/logout/Logout";
import { Students } from "../screens/students/Students";

export const publicRoutes = [
  {
    path: Config.ROUTES.HomePage,
    element: <Registration />,
    exact: true,
  },
  {
    path: Config.ROUTES.adminRegisterationPage,
    element: <Registration />,
    exact: true,
  },
  {
    path: Config.ROUTES.pageNotFound,
    element: <NotFound />,
    exact: true,
  },
];

export const privateRoutes = [
  {
    path: Config.ROUTES.HomePage,
    element: <Dashboard />,
    exact: true,
  },
  {
    path: Config.ROUTES.adminDashboardPage,
    element: <Dashboard />,
    exact: true,
  },
  {
    path: Config.ROUTES.studentsPage,
    element: <Students />,
    exact: true,
  },
  {
    path: Config.ROUTES.logOutPage,
    element: <Logout />,
    exact: true,
  },
  {
    path: Config.ROUTES.pageNotFound,
    element: <NotFound />,
    exact: true,
  },
];
