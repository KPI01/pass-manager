import { AlertDialogAction, AlertDialogCancel, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface Props {
    user: User;
}

function DeleteUser({ user }: Props) {
    const { data, delete: destroy } = useForm({
        id: user.id,
    } satisfies Pick<User, 'id'>);

    const handleSubmit = (e: FormEvent) => {
        destroy(`/user/${data.id}`, {
            onSuccess: () => {
                toast.success('Usuario eliminado correctamente.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <AlertDialogTitle className="mb-4 flex items-start gap-2 text-xl">
                <TriangleAlert className="text-destructive" />
                Confirmación para eliminar
            </AlertDialogTitle>
            ¿Estás seguro de que deseas eliminar al usuario{' '}
            <span className="font-thin italic">
                {user.name} ({user.email}){' '}
            </span>
            ?
            <br />
            <strong>Esta acción no se puede deshacer.</strong>
            <input type="hidden" name="id" value={data.id} />
            <div className="mt-6 flex items-center justify-end gap-x-4">
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit" className={buttonVariants({ variant: 'destructive' })}>
                    Eliminar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default DeleteUser;
