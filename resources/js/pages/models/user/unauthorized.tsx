import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface Props {
    closeAlert: () => void;
    children: ReactNode;
}

function UnauthorizedForUser({ closeAlert, children }: Props) {
    return (
        <>
            <AlertDialogTitle>Permisos insuficientes sobre Usuarios</AlertDialogTitle>
            {children}
            <div className="align-center flex justify-end">
                <Button type="button" onClick={() => closeAlert()}>
                    Cerrar
                </Button>
            </div>
        </>
    );
}

export default UnauthorizedForUser;
