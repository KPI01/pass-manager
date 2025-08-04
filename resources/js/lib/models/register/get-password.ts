type ResponseData = {
    status: 'success' | 'error';
    password?: string;
    error?: string;
};

export async function getRegisterPassword(registerId: number, token: string): Promise<ResponseData> {
    try {
        const res = await fetch(`/register/${registerId}/reveal-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token,
            },
        });

        if (!res.ok) {
            if (res.status === 403) {
                return {
                    status: 'error',
                    error: 'No tienes permisos para acceder a esta contraseña',
                };
            }

            if (res.status === 404) {
                return {
                    status: 'error',
                    error: 'Registro no encontrado',
                };
            }

            return {
                status: 'error',
                error: `Error del servidor: ${res.status}`,
            };
        }

        const data: ResponseData = await res.json();
        return data;
    } catch (error) {
        console.error('network error retrieving password:', error);
        return {
            status: 'error',
            error: 'Error de conexión. Verifica tu internet.',
        };
    }
}
