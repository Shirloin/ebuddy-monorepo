"use client";

import { Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppDispatch } from "@/hooks/redux";
import { fetchUsers } from "@/store/thunks/userThunk";

export default function RefreshButton() {
    const dispatch = useAppDispatch();

    const handleRefresh = () => {
        dispatch(fetchUsers());
    };

    return (
        <Button color="secondary" variant="contained" startIcon={<AutorenewIcon />} onClick={handleRefresh}>
            Refresh
        </Button>
    );
}