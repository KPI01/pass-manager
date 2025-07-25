type ResponseData = {
    status: 'success' | 'error';
    password?: string;
    error?: string;
};

export async function getRegisterPassword(registerId: number, token: string): Promise<ResponseData> {
    try {
        const response = await fetch(`/registers/${registerId}/reveal-password`, {
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
                    error: 'No tienes permisos para acceder a esta contraseña'
                };
            }
            
            if (response.status === 404) {
                return {
                    status: 'error',
                    error: 'Registro no encontrado'
                };
            }

            return {
                status: 'error',
                error: `Error del servidor: ${response.status}`
            };
        }

        const data: ResponseData = await response.json();
        return data;

    } catch (error) {
        console.error('Network error retrieving password:', error);
        return {
            status: 'error',
            error: 'Error de conexión. Verifica tu internet.'
        };
    }
}