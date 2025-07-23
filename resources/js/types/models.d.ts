type Timestamps = {
    created_at: string;
    updated_at: string;
}
export type User = {
    id: number;
    name: string;
    email:string;
    password:string;
} & Timestamps