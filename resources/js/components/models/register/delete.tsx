import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Register } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    register: Register;
}

function DeleteRegister({ register }: Props) {
    const { data, delete: destroy } = useForm({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.debug('deleting register...');
        destroy(`/register/${register.id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <div>Estas a punto de eliminar el registro:</div>
                <div className="my-1 font-bold">
                    {register.description} ({register.login})
                </div>{' '}
                <div className="mt-4">¿Estás seguro que deseas continuar con esto?</div>
                <div className="font-bold">Esta acción es irreversible.</div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-2">
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit" className={buttonVariants({ variant: 'destructive' })}>
                    Eliminar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default DeleteRegister;
