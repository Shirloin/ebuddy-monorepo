import { UserService } from "@/apis/user";
import { User } from "shared/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const res = await UserService.fetchUsers();
    return res.data;
});

export const createUser = createAsyncThunk("users/create", async (user: User) => {
    const res = await UserService.createUser(user)
    return res.data
})

export const updateUser = createAsyncThunk("users/update", async (user: User) => {
    const res = await UserService.updateUser(user)
    return res.data
})

export const deleteUser = createAsyncThunk("users/delete", async (id: string) => {
    const res = await UserService.deleteUser(id)
    return res.data
})
