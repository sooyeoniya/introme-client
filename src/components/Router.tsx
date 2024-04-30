import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SpellCheck from "../pages/check/SpellCheck";
import Layout from "./Layout";
import CompanyList from "../pages/company/CompanyList";
import CompanyAdd from "../pages/company/CompanyAdd";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/check" element={<SpellCheck />} />
                <Route path="/company/list" element={<CompanyList />} />
                <Route path="/company/add" element={<CompanyAdd />} />
            </Route>
        </Routes>
    );
}
