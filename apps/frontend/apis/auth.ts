import handleApiError from "@/lib/handleApiError";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "./axios";
import { User } from 'shared/user';

export const AuthService = {
    async register(data: User): Promise<ApiResponse<User>> {
        try {
            const response = await axios.post<ApiResponse<User>>("/api/auth/register", data)
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    }
}
