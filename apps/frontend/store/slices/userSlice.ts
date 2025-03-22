import { User } from "shared/User";
import { createSlice } from "@reduxjs/toolkit"
import { createUser, deleteUser, fetchUsers, updateUser } from "../thunks/userThunk"

interface UserState {
    users: User[]
    loading: boolean
    error: boolean
    message: string | null
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: false,
    message: null
}


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // FETCH USER
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = "Fetching user data";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.message = "Success fetching user";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || "Failed to fetch users";
            })

            // CREATE USER
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = "Creating user data";
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.message = "Success create user";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true
                state.message = action.error.message || "Failed to create user";
            })
            // UPDATE USER
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = "Updating user data";
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.message = "Success update user";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true
                state.message = action.error.message || "Failed to update user";
            })

            //DELETE USER
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = "Deleting user";
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.message = "Success delete user";
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true
                state.message = action.error.message || "Failed to delete user";
            });
    }
})

export default userSlice.reducer