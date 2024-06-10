import TalentBanner from "../../components/talent/TalentBanner.tsx";
import TalentContents from "../../components/talent/TalentContents.tsx";
import TalentFooter from "../../components/talent/TalentFooter.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

interface CompanyInfo {
    location: string;
    url: string;
    recruitUrl: string;
    techBlog: string;
}

interface Talent {
    id: number;
    keyword: string;
    description: string;
    icon: string;
    permission: string;
    baseUrl: string;
}

interface CompanyData {
    name: string;
    image: string;
    identityColor: string;
    companyInfo: CompanyInfo;
    updatedAt: string;
    talents: Talent[];
}

export default function TalentInfo() {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/v1/company/talent/2", {
                    headers: {
                        Accept: "application/json"
                    },
                    withCredentials: true
                });
                setCompanyData(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        })();
    }, []);

    // TODO: Skeleton UI 적용
    if (!companyData) return <div></div>;

    return (
        <div>
            <TalentBanner companyData={companyData} />
            <TalentContents talentData={companyData.talents} />
            <TalentFooter />
        </div>
    );
}
