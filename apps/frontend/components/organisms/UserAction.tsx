'use client'
import CreateUserDialog from "@/components/organisms/CreateUserDialog";
import RefreshButton from "@/components/atoms/RefreshButton";
import { Box } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";

export default function UserAction() {
    const isAuthenticated = useAuth()
    return (
        <>
            {
                isAuthenticated &&
                <Box component={"section"} sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 2, width: "100%" }}>
                    <CreateUserDialog />
                    <RefreshButton />
                </Box>
            }
        </>
    )
}