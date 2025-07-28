import { SelectWithLabel } from '@/components/forms/select';
import { InputToggleVisibility, InputWithLabel } from '@/components/forms/text-input';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    roles: Record<string, string>;
}

function CreateUser({ roles }: Props) {
    console.debug('roles', roles);
    const { data, setData, isDirty, post, reset, hasErrors, errors } = useForm({
        email: '',
        name: '',
        password: '',
        role_id: 0,
        password_confirmation: '',
    } satisfies Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'> & { password_confirmation: string; role_id?: number });

    console.error('errors', errors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.debug(data);

        post('/user', {
            onSuccess: () => {
                toast.success('Usuario creado exitosamente');
                reset();
            },
            onError: () => {
                toast.error('Ha ocurrido un error al enviar el formulario. Por favor, verifica los datos ingresados .');
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4 p-4 md:grid-cols-2">
                <InputWithLabel tabIndex={1} label="Nombre *" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <SelectWithLabel
                    tabIndex={2}
                    label="Rol"
                    name="role"
                    options={roles}
                    value={String(data.role_id)}
                    onValueChange={(e) => setData('role_id', parseInt(e))}
                />
                <div className="col-span-full">
                    <InputWithLabel
                        tabIndex={3}
                        label="Correo *"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                <InputToggleVisibility
                    tabIndex={4}
                    label="Clave *"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputToggleVisibility
                    tabIndex={5}
                    label="Confirmación de clave *"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => {
                        setData('password_confirmation', e.target.value);
                    }}
                />
            </div>
            <div className="mt-8 flex h-fit items-center justify-end gap-x-4">
                <AlertDialogCancel tabIndex={7} onClick={() => reset()} className={buttonVariants({ variant: 'secondary' })} type="button">
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction tabIndex={6} className={buttonVariants({ variant: 'default' })} type="submit" disabled={!isDirty || hasErrors}>
                    Guardar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default CreateUser;
