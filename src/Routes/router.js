import { createBrowserRouter } from "react-router-dom";
import CheckOut from "../components/pages/CheckOut/CheckOut";
import About from "../components/pages/Home/About/About";
import Home from "../components/pages/Home/Home/Home";
import Services from "../components/pages/Home/Services/Services";
import Login from "../components/pages/Login/Login";
import Orders from "../components/pages/Orders/Orders";
import Register from "../components/pages/Register/Register";
import ComingSoon from "../components/shared/ComingSoon/ComingSoon";

import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/blog',
        element: <ComingSoon />
      },
      {
        path: '/contact',
        element: <ComingSoon />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/checkout/:id',
        element: <PrivateRoute><CheckOut /></PrivateRoute>
      },
      {
        path: '/orders',
        element: <PrivateRoute><Orders /></PrivateRoute>
      }
    ]
  }
])