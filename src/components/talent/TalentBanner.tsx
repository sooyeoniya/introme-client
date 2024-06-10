import NavigationLinksButton from "../buttons/NavigationLinksButton.tsx";
import TalentIconSlider from "./TalentIconSlider.tsx";
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

export default function TalentBanner() {
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

    if (!companyData) return <div>Loading...</div>;

    const { name, image, identityColor, companyInfo, updatedAt, talents } = companyData;
    const { location, url, recruitUrl, techBlog } = companyInfo;

    return (
        <div className={`bg-[${identityColor}] pt-28 px-9 pb-8`}>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex pt-10 pr-4 w-36 justify-end">
                        <div className="flex h-20 w-20 p-2 rounded-xl bg-white">
                            <img src={image} alt={undefined} />
                        </div>
                    </div>
                    <div className="grow">
                        <div className="flex justify-between">
                            <div className="content-end text-xl font-GmarketSansBold">
                                기업 인재상
                            </div>
                            {/* TODO: 인재상 추가 페이지 연결 */}
                            <NavigationLinksButton text="인재상 추가" url="#" />
                        </div>
                        <div className="h-20 text-6xl content-center font-GmarketSansBold">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="pl-36">{location}</div>
                <TalentIconSlider talents={talents} />
                <div className="flex gap-3 pl-12">
                    <NavigationLinksButton text="웹 사이트" isBlue={true} url={url} />
                    <NavigationLinksButton text="채용 사이트" url={recruitUrl} />
                    <NavigationLinksButton text="기술 블로그" url={techBlog} />
                </div>
                <div className="flex justify-end">
                    마지막 업데이트: {new Date(updatedAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
