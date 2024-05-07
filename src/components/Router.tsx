import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SpellCheck from "../pages/check/SpellCheck";
import Layout from "./Layout";
import TalentDetail from "../pages/talent/TalentDetail.tsx";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/check" element={<SpellCheck />} />
                {/* TODO: 경로 수정 */}
                <Route path="/talent-detail" element={<TalentDetail />} />
            </Route>
        </Routes>
    );
}
