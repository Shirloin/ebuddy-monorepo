'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUsers } from "@/store/thunks/userThunk";
import { User } from "shared/User";
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import UpdateUserDialog from "./UpdateUserDialog";
import DeleteButton from "../atoms/DeleteButton";


export default function UserList() {

    const dispatch = useAppDispatch()
    const { users, loading, error, message } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {loading && (
                    <Typography variant="h6" color="primary">
                        {message}
                    </Typography>
                )}

                {error && (
                    <Typography variant="h6" color="error">
                        {message}
                    </Typography>
                )}

                {message && !loading && !error && (
                    <Typography variant="h6" color="success.main">
                        {message}
                    </Typography>
                )}

                {users.length > 0 && (
                    <Paper sx={{ width: "100%", overflowX: "auto", p: 2, mt: 2 }}>
                        <Table sx={{ minWidth: 400 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((u: User) => (
                                    <TableRow key={u.id}>
                                        <TableCell align="left">{u.name}</TableCell>
                                        <TableCell align="left">{u.email}</TableCell>
                                        <TableCell align="center">
                                            <UpdateUserDialog user={u} />
                                            <DeleteButton id={u.id!} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                )}
            </Box>
        </>
    )
}