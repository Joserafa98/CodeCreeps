import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import Profile from "./pages/ProfileUser";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Retos from "./pages/retos"; // Importación corregida
import { AboutUs } from "./pages/aboutUs";
import HalloweenCodingChallenge from "./component/CourseCard";
import { Treats } from "./pages/recursos";
import ChatGeneral from "./pages/ChatGeneral";

import { MiniJuegos } from "./pages/miniJuegos";
import  MemorySpooky from "./pages/memorySpooky";
import LightsOut from "./pages/lightsOut";
import SnakeGame from "./pages/snakeGame";
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
                        <Route element={<AboutUs />} path="/aboutUs" />
                        <Route element={<HalloweenCodingChallenge />} path="/challenges/:id" />
                        <Route element={<Treats />} path="/Treats" />
                        <Route element={<MiniJuegos />} path="/miniJuegos" />
                        <Route element={<MemorySpooky />} path="/memory-Spooky" />
                        <Route element={<LightsOut />} path="/lights-Out" />
                        <Route element={<SnakeGame />} path="/snake-de-halloween" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<ChatGeneral />} path="/chatgeneral" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
