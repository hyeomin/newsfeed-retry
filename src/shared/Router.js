import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Write from "../pages/Write";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/write" element={<Write />} />
                <Route path="/write/:id" element={<Write />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate replace to={"/"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
