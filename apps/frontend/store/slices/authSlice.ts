import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean
}
const initialState: AuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("access_token");
            state.isAuthenticated = false;
        },
        setAuthState: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});
export const { logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;