import { InputToggleVisibility } from '@/components/forms/text-input';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    user: User;
}

function ResetUserPassword({ user }: Props) {
    const { data, setData, patch, isDirty, reset } = useForm({
        password: '',
        password_confirmation: '',
    } satisfies Pick<User, 'password'> & { password_confirmation: string });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/user/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Contraseña restablecida correctamente. Para el usuario ${user.email}`);
                reset();
            },
            onError: (errors) => {
                toast.error(`Error al restablecer la contraseña: ${errors.password || 'Error desconocido'}`);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid space-y-8">
            <InputToggleVisibility
                label="Nueva contraseña *"
                name="password"
                placeholder="Ingrese la nueva contraseña"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
            />
            <InputToggleVisibility
                label="Confirma la nueva constraseña *"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
            />

            <div className="flex justify-end gap-x-4">
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!isDirty}>
                    Restablecer
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default ResetUserPassword;
