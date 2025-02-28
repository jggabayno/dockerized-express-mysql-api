export interface UserInterface {
    id?: number;
    photo?: string;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    password?: string;
    role: string;
}

export interface AuthUserInterface {
    id: number;
    role: string;
}