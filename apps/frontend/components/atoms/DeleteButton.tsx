'use client'
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from "@/hooks/redux";
import { deleteUser } from "@/store/thunks/userThunk";

interface DeleteUserProps {
    id: string
}

export default function DeleteButton({ id }: DeleteUserProps) {

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(deleteUser(id))
    }

    return (
        <>
            <Button variant="text" onClick={handleClick}><DeleteIcon /></Button>
        </>
    )
}