import { Config } from "./Config";
import { Registration } from "../screens/registration/Registration";
import { NotFound } from "../screens/notFound/NotFound";
import { Dashboard } from "../screens/dashboard/Dashboard";
import { Logout } from "../screens/logout/Logout";
import { Students } from "../screens/students/Students";
import { Admins } from "../screens/admins/Admins";
import { Instructors } from "../screens/instructors/Instructors";
import { Term } from "../screens/term/Term";
import { Calendar } from "../screens/calendar/Calendar";
import { Comments } from "../screens/comments/Comments";
import { Chat } from "../screens/chat/Chat";
import { News } from "../screens/news/News";
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
    path: Config.ROUTES.adminsPage,
    element: <Admins />,
    exact: true,
  },
  {
    path: Config.ROUTES.instructorsPage,
    element: <Instructors />,
    exact: true,
  },
  {
    path: Config.ROUTES.TermPage,
    element: <Term />,
    exact: true,
  },
  {
    path: Config.ROUTES.commentsPage,
    element: <Comments />,
    exact: true,
  },
  {
    path: Config.ROUTES.chatPage,
    element: <Chat />,
    exact: true,
  },
  {
    path: Config.ROUTES.calendarPage,
    element: <Calendar />,
    exact: true,
  },
  {
    path: Config.ROUTES.newsPage,
    element: <News />,
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
