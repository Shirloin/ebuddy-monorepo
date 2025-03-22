'use client'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, { ChangeEvent, FormEvent, useState } from "react";
import { validateEmail, validateName, validatePassword } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/redux";
import { createUser } from "@/store/thunks/userThunk";

export default function CreateUserDialog() {

    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const validateInputs = () => {
        const email = form.email
        const name = form.name
        const password = form.password
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



        if (validatePassword(password)) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
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
        dispatch(createUser(form))
    }

    return (
        <React.Fragment>
            <Button color="secondary" variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>User</Button>
            <Dialog
                fullWidth
                maxWidth="xs"
                onClose={handleClose} open={open} slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit
                    }
                }}>
                <DialogTitle>Create New User</DialogTitle>
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
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            value={form.password}
                            onChange={handleChange}
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
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