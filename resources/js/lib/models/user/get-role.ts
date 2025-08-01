import { Role } from '@/types/models';

type GetUserRoleParams = {
    userId: number;
    token: string;
};

type ResponseData = {
    status: 'success' | 'error';
    role?: Role['short'];
    error?: string;
    message?: string;
};

export async function getUserRole({ userId, token }: GetUserRoleParams): Promise<ResponseData> {
    try {
        const res = await fetch(`/user/${userId}/get-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token,
            },
        });

        if (!res.ok) {
            if (res.status === 404) {
                return {
                    status: 'error',
                    message: 'No se encontró el usuario',
                };
            } else if (res.status === 403) {
                return {
                    status: 'error',
                    message: 'No tiene permisos para ver el rol del usuario',
                };
            }

            return {
                status: 'error',
                error: res.statusText,
            };
        }

        const data: ResponseData = await res.json();
        return data;
    } catch (err) {
        console.error('Error making the request', err);
        return {
            status: 'error',
            error: String(err),
        };
    }
}
