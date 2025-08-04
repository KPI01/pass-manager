type ResponseData = {
    status?: string;
    error?: string;
    canEdit?: boolean;
};

export default async function checkCanUpdateRegister(registerId: number, token: string): Promise<ResponseData> {
    try {
        const response = await fetch(`/register/${registerId}/check-can-update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': token,
            },
        });

        if (!response.ok) {
            // Manejar diferentes tipos de errores HTTP
            if (response.status === 403) {
                return {
                    status: 'error',
                    error: 'No tienes permisos para acceder a esta contraseña',
                };
            }

            if (response.status === 404) {
                return {
                    status: 'error',
                    error: 'Registro no encontrado',
                };
            }

            return {
                status: 'error',
                error: `Error del servidor: ${response.status}`,
            };
        }

        return response.json();
    } catch (error) {
        console.error('network error retrieving password:', error);
        return {
            status: 'error',
            error: 'Error de conexión. Verifica tu internet.',
        };
    }
}
