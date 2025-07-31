import { Change } from '@/types/models';

type GetRegisterChangesParams = {
    registerId: number;
    token: string;
};

type ResponseData = {
    status: 'success' | 'error';
    error?: string;
    history?: Change[];
};

/**
 * Gets an array with the changes made in the register.
 * @param {number} registerId - The id of the register.
 * @param {string} token - The CSRF token.
/* @returns {Promise<ResponseData>} A promise that resolves to An array with the changes made in the register.
 */
export async function getRegisterChanges({ registerId, token }: GetRegisterChangesParams) {
    try {
        const res = await fetch(`/registers/${registerId}/changes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token,
            },
        });

        if (!res.ok) {
            return {
                status: 'error',
                error: `Ha ocurrido un error al realizar la petición (${res.status}: ${res.statusText})`,
            } as ResponseData;
        }

        const data: ResponseData = await res.json();
        return data;
    } catch {
        return {
            status: 'error',
            error: 'Ha ocurrido un error al realizar la petición (Error en el servidor)',
        } as ResponseData;
    }
}
