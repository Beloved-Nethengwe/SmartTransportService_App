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
    roleId:number
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

export interface DriverDto{
    ID: string; 
    IDNumber: string;
    Name: string;//
    Surname: string;
    CellphoneNumber: string;
    Image: string;
    CarRegistrationNumber:string;
    Password: string;
    conPassword: string;
    Email:string;
    roleId:number;
}