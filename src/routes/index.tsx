import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import Home from "../pages/Home";
import MoviesDetail from "../pages/MoviesDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <MoviesPage />
                {/* <Link to="about">About Us</Link> */}
            </div>
        ),
    },
    {
        path: "/movies/:id",
        element: < MoviesDetail />,
    },

]);