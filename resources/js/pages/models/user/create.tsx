import { InputWithLabel } from '@/components/forms/text-input';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/user' },
    { title: 'Creando usuario...', href: '/user/create' },
];

function CreateUser() {
    const [validConfirmation, setValidConfirmation] = useState(false);

    const { data, setData, isDirty } = useForm({
        email: '',
        password: '',
        name: '',
        password_confirmation: '',
    } satisfies Omit<User, 'id' | 'created_at' | 'updated_at'> & { password_confirmation: string });

    const validatePasswordConfirmation = () => {
        if (data.password === data.password_confirmation) {
            setValidConfirmation(true);
        }
    };

    return (
        <form>
            <div className="grid w-full gap-4 p-4 md:grid-cols-2">
                <InputWithLabel label="Nombre *" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <InputWithLabel label="Correo *" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputWithLabel
                    label="Clave *"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputWithLabel
                    label="Confirmación de clave *"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => {
                        setData('password_confirmation', e.target.value);
                        validatePasswordConfirmation();
                    }}
                />
                {isDirty && !validConfirmation && data.password_confirmation !== '' && (
                    <div className="col-span-full text-red-500">
                        Las claves no coinciden. Por favor, verifique que la clave y su confirmación sean iguales.
                    </div>
                )}
            </div>
            <div className="mt-8 flex h-fit justify-end gap-x-4">
                <AlertDialogCancel className={buttonVariants({ variant: 'secondary' })} type="button">
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction className={buttonVariants({ variant: 'default' })} type="submit" disabled={!validConfirmation}>
                    Guardar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default CreateUser;
