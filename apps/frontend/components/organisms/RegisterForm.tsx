'use client'
import StyledCard from "@/components/molecules/Card";
import BaseContainer from "@/components/template/BaseContainer";
import { useAppDispatch } from "@/hooks/redux";
import { auth } from "@/lib/firebase";
import { validateEmail, validatePassword } from "@/lib/utils";
import { register } from "@/store/thunks/authThunk";
import { Box, Button, FormControl, FormLabel, TextField, Typography, Link } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";


export default function RegisterForm() {
    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()

    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (emailError || passwordError) {
            return
        }
        await createUserWithEmailAndPassword(auth, form.email, form.password)
        dispatch(register(form))
        router.push("/login")
    }

    const validateInputs = () => {
        const email = form.email
        const password = form.password
        let isValid = true;


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

    return (
        <>
            <BaseContainer>
                <StyledCard variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign Up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
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
                            onClick={validateInputs}
                        >
                            Sign Up
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </StyledCard>
            </BaseContainer>
        </>
    )
}