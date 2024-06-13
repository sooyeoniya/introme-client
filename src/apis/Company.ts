import axios, { AxiosInstance } from "axios";

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

export class CompanyAPI {
    static instance: AxiosInstance = axios.create({
        baseURL: "/api/v1",
        timeout: 3000,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });

    public static async getCompanyTalentInfo(companyId: string): Promise<CompanyData> {
        const response = await this.instance.get(`/company/talent/${companyId}`);
        return response.data as CompanyData;
    }

    // 필요한 API 추가
}
