import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>
    }
])

export default routes;