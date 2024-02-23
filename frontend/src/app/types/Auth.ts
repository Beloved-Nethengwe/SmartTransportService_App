export interface User{
    ID: string;
    Name: string;
    Surname: string;
    IDNumber: string;
    Address: string;
    CellphoneNumber: string;
    Password: string;
    conPassword: string;
    Email:string;
}

export interface LoginForm{
    password: string;
    email:string;
}

