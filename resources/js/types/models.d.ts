type BaseModel = {
    id: number;
    created_at: string;
    updated_at: string;
};

type Role = {
    name: string;
    short: string;
} & BaseModel;

export type User = {
    name: string;
    email: string;
    password: string;
    role: Role;
} & BaseModel;

export type Register = {
    description: string;
    type: 'user' | 'email' | string; // Added type 'string' form compatibility whe using with Select component
    login: string;
    password: string;
    notes?: string;
    owner: User;
} & BaseModel;
