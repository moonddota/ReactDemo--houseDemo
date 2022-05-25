import "./App.less";
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import Main from "./pages/main/main";
import Home from "./pages/home/home";
import Project from "./pages/project/project";
import Square from "./pages/square/square";
import Navigation from "./pages/navigation/navigation";
import Ask from "./pages/ask/ask";
import System from "./pages/system/system";
import OfficialAccount from "./pages/official-account/official-account";
import ProgectClass from "./pages/progect-class/progect-class";
import Tool from "./pages/tool/tool";
import Login from "./pages/login/login";
import ChinaColor from "./pages/china_color/china_color";
import Coin from "./pages/coin/coin";
import My from "./pages/my/my";
import MyPage from "./pages/my-page/my-page";
import Entertainment from "./pages/entertainment/entertainment";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/main/" element={<Main />}>
                    <Route path="/main/home" element={<Home />} />
                    <Route path="/main/square" element={<Square />} />
                    <Route path="/main/navigation" element={<Navigation />} />
                    <Route path="/main/ask" element={<Ask />} />
                    <Route path="/main/system" element={<System />} />
                    <Route path="/main/project" element={<Project />} />
                    <Route path="/main/official-account" element={<OfficialAccount />} />
                    <Route path="/main/progect-class" element={<ProgectClass />} />
                    <Route path="/main/tool" element={<Tool />} />
                    <Route path="/main/login" element={<Login />} />
                    <Route path="/main/chinacolor" element={<ChinaColor />} />
                    <Route path="/main/" element={<Navigate to="/main/home" />} />
                </Route>
                <Route path="/my" element={<My />}>
                    <Route path="/my/mypage" element={<MyPage />} />
                    <Route path="/my/coin" element={<Coin />} />
                    <Route path="/my" element={<Navigate to="/my/mypage" />} />
                </Route>
                <Route path="/entertainment" element={<Entertainment />}></Route>
                <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
