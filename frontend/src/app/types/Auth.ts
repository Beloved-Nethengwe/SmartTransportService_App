export interface User{
    ID: string;
    PName: string;
    Surname: string;
    IDNumber: string;
    Address: string;
    CellphoneNumber: string;
    Password: string;
    conPassword: string;
    Email:string;
    Role:string
}

export interface UserDto{
    ID: string;
    PName: string;
    Surname: string;
    IDNumber: string;
    Address: string;
    CellphoneNumber: string;
    Role:string
}

export interface LoginForm{
    password: string;
    email:string;
}

