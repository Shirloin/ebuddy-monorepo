import axios from "axios";

const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
        throw new Error(error.response?.data?.message || "Network error");

    }
    throw new Error("An unexpected error occurred");
};

export default handleApiError;