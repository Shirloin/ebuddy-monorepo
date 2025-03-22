'use client'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { ChangeEvent, FormEvent, useState } from "react";
import { validateEmail, validateName } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/redux";
import { updateUser } from "@/store/thunks/userThunk";
import { User } from "shared/User";

interface UpdateUserDialogProps {
    user: User
}

export default function UpdateUserDialog({ user }: UpdateUserDialogProps) {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        ...user,
    })

    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const validateInputs = () => {
        const email = form.email
        const name = form.name
        let isValid = true;

        if (validateName(name)) {
            setNameError(true);
            setNameErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (validateEmail(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }



        return isValid;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateInputs()) {
            return
        }

        handleClose()
        dispatch(updateUser(form))


    }

    return (
        <React.Fragment>
            <Button variant="text" onClick={handleOpen}><EditIcon /></Button>
            <Dialog
                fullWidth
                maxWidth="xs"
                onClose={handleClose} open={open} slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit
                    }
                }}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} >
                    <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <TextField
                            value={form.name}
                            onChange={handleChange}
                            error={nameError}
                            helperText={nameErrorMessage}
                            id="name"
                            type="name"
                            name="name"
                            placeholder="shirloin"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={nameError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            value={form.email}
                            onChange={handleChange}
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog >
        </React.Fragment>
    )
}