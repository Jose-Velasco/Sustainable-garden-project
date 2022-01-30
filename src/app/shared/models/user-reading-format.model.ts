/**
 * Interface based on the backend model
 */
export interface registerUser {
    id: number,
    username: string,
    email: string,
    password: string
}

export interface loginUser{
    id: number,
    username: string,
    password: string
}