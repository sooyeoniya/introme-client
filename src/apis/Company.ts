import axios, { AxiosInstance } from "axios";
import { CompanyData } from "../types/talent";

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
