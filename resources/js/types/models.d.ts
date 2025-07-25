type BaseModel = {
    id: number;
    created_at: string;
    updated_at: string;
};
export type User = {
    name: string;
    email: string;
    password: string;
} & BaseModel;

export type Register = {
    description: string;
    type: 'user' | 'email' | string; // Added type 'string' form compatibility whe using with Select component
    login: string;
    password: string;
    notes?: string;
} & BaseModel;
