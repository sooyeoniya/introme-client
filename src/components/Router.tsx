import { Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main.tsx";
import SpellCheck from "../pages/check/SpellCheck";
import Layout from "./Layout";
import TalentInfo from "../pages/talent/TalentInfo.tsx";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/check" element={<SpellCheck />} />
                {/* TODO: 경로 수정 필요 */}
                <Route path="/talent" element={<TalentInfo />} />
            </Route>
        </Routes>
    );
}
