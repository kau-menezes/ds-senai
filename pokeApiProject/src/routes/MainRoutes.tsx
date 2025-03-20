import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Team from "../pages/Team/Team.tsx";

export default function MainRoutes() {

    return(
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: "/",
                    element: <Login/>
                },
                {
                    path: "/home",
                    element: <Home/>
                },
                {
                    path: "/team",
                    element: <Team/>
                },
            ])}
        />
    )
}