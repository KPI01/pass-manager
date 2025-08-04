import { InputWithLabel } from '@/components/forms/text-input';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    user: User;
}

function UpdateUser({ user }: Props) {
    const { data, setData, isDirty, patch, errors } = useForm({
        email: user.email,
        name: user.name,
    } satisfies Pick<User, 'email' | 'name'>);
    if (errors) console.error('errors', errors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/user/${user.id}`, {
            onSuccess: () => {
                toast.success('Usuario actualizado correctamente');
            },
            onError: () => {
                toast.error('Error al actualizar el usuario');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <InputWithLabel label="Correo" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            <InputWithLabel label="Nombre" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <div className="flex items-center justify-end gap-x-4">
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!isDirty}>
                    Guardar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default UpdateUser;
