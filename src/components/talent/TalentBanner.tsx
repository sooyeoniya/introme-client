import NavigationLinksButton from "../buttons/NavigationLinksButton.tsx";
import TalentIconSlider from "./TalentIconSlider.tsx";
import { useEffect, useState } from "react";
export default function TalentBanner() {
    // @ts-ignore
    const [companyData, setCompanyData] = useState<>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/v1/company/talent/2", {
                    headers: {
                        Accept: "application/json"
                    },
                    method: "GET"
                });
                const data = await response.json();
                console.log(data);
                //setCompanyData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (!companyData) return <div>Loading...</div>;

    const { name, image, backgroundColor, companyInfo, updatedAt, talents } = companyData;
    const { location, url, recruitUrl, techBlog } = companyInfo;

    return (
        <div className={`bg-${backgroundColor ?? "my-gray"} pt-28 px-9 pb-8`}>
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
