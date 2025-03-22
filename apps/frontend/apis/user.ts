import { ApiResponse } from "@/types/ApiResponse"
import axios from "./axios"
import { User } from "shared/User"
import handleApiError from "@/lib/handleApiError"

export const UserService = {
    async fetchUsers(): Promise<ApiResponse<User[]>> {
        try {
            const response = await axios.get<ApiResponse<User[]>>("/api/users")
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error
        }
    },
    async createUser(user: User): Promise<ApiResponse<User>> {
        try {
            const response = await axios.post<ApiResponse<User>>("/api/users", user)
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error
        }
    },
    async updateUser(user: User): Promise<ApiResponse<User>> {
        try {
            const response = await axios.put<ApiResponse<User>>(`/api/users/${user.id}`, user)
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error
        }
    },
    async deleteUser(id: string): Promise<ApiResponse<User>> {
        try {
            const response = await axios.delete<ApiResponse<User>>(`/api/users/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error);
            throw error
        }
    },
}