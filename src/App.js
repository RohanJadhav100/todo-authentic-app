import logo from "./logo.svg";
import "./App.css";
import { Calendar } from "./components/ui/calendar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Rootlayout";
import Homepage from "./pages/Home";
import Auth from "./auth/auth";
import Todo from "./pages/todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Todo /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
]);

function App() {
  // const handleRedirect = (path) => {
  //   window.location.href = path;
  // };

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
