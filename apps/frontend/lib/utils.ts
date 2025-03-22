export const validateEmail = (email?: string) => {
    return !email || !/\S+@\S+\.\S+/.test(email)
}

export const validatePassword = (password?: string) => {
    return !password || password.length < 6
}

export const validateName = (name?: string) => {
    return !name || name.length < 3
}