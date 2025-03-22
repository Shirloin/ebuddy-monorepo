'use client'
import { useAppDispatch } from "@/hooks/redux";
import { useAuth } from "@/hooks/useAuth";
import { logout, setAuthState } from "@/store/slices/authSlice";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
    const router = useRouter()
    const dispatch = useAppDispatch();

    const isAuthenticated = useAuth();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/login")
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        dispatch(setAuthState(!!token));
    }, [dispatch])
    return (
        <>
            <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, right: 0, left: 0, zIndex: '100' }}>
                <AppBar position="static">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                        <Typography variant="h6" color="primary">EBuddy</Typography>
                        {

                            isAuthenticated ?
                                <Button color="inherit" onClick={handleLogout}>Logout</Button> :
                                <Button color="inherit" component={Link} href="/login">Login</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}