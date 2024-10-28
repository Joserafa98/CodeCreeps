import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Retos from "./pages/retos"; // Mantener solo una importación de Retos
import HalloweenCodingChallenge from "./component/CourseCard";
import { Treats } from "./pages/recursos";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    // Verificar la URL del backend
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Retos />} path="/challenges" />
                        <Route element={<HalloweenCodingChallenge />} path="/challenges/:id" /> {/* Aquí se debe mantener plural */}
                        <Route element={<Treats />} path="/Treats" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
