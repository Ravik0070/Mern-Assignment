import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar";
import "./style.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Note from "./component/Note";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import EditForm from "./component/EditForm";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
function App() {
  const { currentUser } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: currentUser ? <Home /> : <Login />,
        },
        {
          path: "/:id",
          element: currentUser ? <Note /> : <Login />,
        },
        {
          path: "/form/:id?",
          element: currentUser ? <EditForm /> : <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
