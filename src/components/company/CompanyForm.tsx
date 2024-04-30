/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyProps, Talent } from "../../types/company";

export default function CompanyForm() {
    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyProps>({
        name: "",
        image: "이미지.png",
        companyInfo: {
            location: "",
            url: "",
            recruitUrl: "",
            techBlog: ""
        },
        talents: [{ id: 1, keyword: "", description: "", baseUrl: "" }]
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(company)
            });
            if (!response.ok) {
                throw new Error("에러");
            }
            navigate("/company/list");
        } catch (error: any) {
            console.error("Error:", error);
        }
    };

    const handleChange = (name: string, value: string, context?: string) => {
        if (context === "companyInfo") {
            setCompany(prev => ({
                ...prev,
                companyInfo: {
                    ...prev.companyInfo,
                    [name]: value
                }
            }));
        } else {
            setCompany(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTalentChange = (index: number, field: string, value: string) => {
        const updatedTalents = company.talents.map((talent, idx) => {
            if (idx === index) {
                return { ...talent, [field]: value };
            }
            return talent;
        });
        setCompany(prev => ({ ...prev, talents: updatedTalents }));
    };

    const handleAddTalent = () => {
        const newTalent: Talent = {
            id: company.talents.length + 1,
            keyword: "",
            description: "",
            baseUrl: ""
        };
        setCompany(prev => ({ ...prev, talents: [...prev.talents, newTalent] }));
    };

    const handleRemoveTalent = (id: number | undefined) => {
        const filteredTalents = company.talents.filter(talent => talent.id !== id);
        setCompany(prev => ({ ...prev, talents: filteredTalents }));
    };
    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="companyName" className="block font-GmarketSansBold text-xl">
                        기업명
                        <span className="text-[#EA3323] font-GmarketSansMedium text-xs ml-2">
                            *
                        </span>
                    </label>
                    <span className="text-[#EA3323] text-xs">*필수</span>
                </div>
                <input
                    id="companyName"
                    type="text"
                    required
                    className="text-xs max-w-lg w-full bg-[#F1F3F5] rounded-lg py-4 px-5 placeholder:text[#ADB5BD] placeholder:text-xs"
                    placeholder="인트로미"
                    maxLength={20}
                    value={company.name}
                    onChange={e => handleChange("name", e.target.value)}
                />
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="companyAddress" className="block font-GmarketSansBold text-xl">
                        기업 주소
                        <span className="text-[#EA3323] font-GmarketSansMedium text-xs ml-2">
                            *
                        </span>
                    </label>
                </div>
                <input
                    id="companyAddress"
                    type="text"
                    required
                    className="text-xs max-w-lg w-full bg-[#F1F3F5] rounded-lg py-4 px-5 placeholder:text[#ADB5BD] placeholder:text-xs"
                    placeholder="예시) 서울특별시 강남구"
                    maxLength={20}
                    value={company.companyInfo.location}
                    onChange={e => handleChange("location", e.target.value, "companyInfo")}
                />
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="companyWebsite" className="block font-GmarketSansBold text-xl">
                        웹사이트 주소
                        <span className="text-[#EA3323] font-GmarketSansMedium text-xs ml-2">
                            *
                        </span>
                    </label>
                </div>
                <div className="flex items-center">
                    <span className="text-xs absolute text-[#666666] ml-5">https://</span>
                    <input
                        id="companyWebsite"
                        type="text"
                        required
                        className="text-xs max-w-lg w-full bg-[#F1F3F5] rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                        placeholder="www.introme.com"
                        maxLength={70}
                        value={company.companyInfo.url}
                        onChange={e => handleChange("url", e.target.value, "companyInfo")}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label
                        htmlFor="companyEmployment"
                        className="block font-GmarketSansBold text-xl"
                    >
                        채용사이트 주소
                    </label>
                </div>
                <div className="flex items-center">
                    <span className="text-xs absolute text-[#666666] ml-5">https://</span>
                    <input
                        id="companyEmployment"
                        type="text"
                        className="text-xs max-w-lg w-full bg-[#F1F3F5] rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                        placeholder="www.introme.com"
                        maxLength={70}
                        value={company.companyInfo.recruitUrl}
                        onChange={e => handleChange("recruitUrl", e.target.value, "companyInfo")}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="companyBlog" className="block font-GmarketSansBold text-xl">
                        테크블로그 주소
                    </label>
                </div>
                <div className="flex items-center">
                    <span className="text-xs absolute text-[#666666] ml-5">https://</span>
                    <input
                        id="companyBlog"
                        type="text"
                        className="text-xs max-w-lg w-full bg-[#F1F3F5] rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                        placeholder="www.introme.com"
                        maxLength={70}
                        value={company.companyInfo.techBlog}
                        onChange={e => handleChange("techBlog", e.target.value, "companyInfo")}
                    />
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-between ">
                    <label htmlFor="companyTalent" className="block font-GmarketSansBold text-xl">
                        기업 인재상
                        <span className="text-[#EA3323] font-GmarketSansMedium text-xs ml-2">
                            *
                        </span>
                    </label>
                    <div className="text-xs text-[#464646] font-GmarketSansLight my-1">
                        <span>1. 기업 인재상 1개 이상 필수로 작성해주세요. </span>
                        <br />
                        <span>2. 해당 기업의 인재상을 확인할 수 있는 url을 첨부해주세요.</span>
                    </div>
                </div>
                {company.talents.map((talent, index) => (
                    <div
                        key={talent.id}
                        className="bg-[#F1F3F5] max-w-lg w-full flex flex-col px-2 py-3 space-y-3 rounded-lg mb-2"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs">{index + 1}번째 인재상</span>
                            {index > 0 && (
                                <button
                                    type="button"
                                    className="text-sm"
                                    onClick={() => handleRemoveTalent(talent.id)}
                                >
                                    x
                                </button>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs absolute text-[#666666] ml-5">키워드</span>
                            <input
                                type="text"
                                required
                                className="text-xs w-full bg-white rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                                placeholder="예시) 사회적 책임감"
                                maxLength={20}
                                value={talent.keyword}
                                onChange={e => handleTalentChange(index, "keyword", e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs absolute text-[#666666] ml-5">설명</span>
                            <input
                                type="text"
                                required
                                className="text-xs w-full bg-white rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                                placeholder="예시) 보다 나은 세상을 만들기 위해 노력합니다."
                                value={talent.description}
                                onChange={e =>
                                    handleTalentChange(index, "description", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs absolute text-[#666666] ml-5">URL</span>
                            <input
                                type="text"
                                required
                                className="text-xs w-full bg-white rounded-lg py-4 pr-5 pl-20 placeholder:text[#ADB5BD] placeholder:text-xs"
                                placeholder="www.introme.com"
                                value={talent.baseUrl}
                                onChange={e => handleTalentChange(index, "baseUrl", e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="text-xs max-w-lg w-full bg-[#F1F3F5] text-[#828282] rounded-lg mt-2"
                    onClick={handleAddTalent}
                >
                    +
                </button>
            </div>
            <button
                type="submit"
                className="text-white bg-[#0085FF] px-6 py-2 rounded-lg ml-auto flex"
            >
                제출 하기
            </button>
        </form>
    );
}
