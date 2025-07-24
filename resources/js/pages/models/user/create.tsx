import { InputToggleVisibility, InputWithLabel } from '@/components/forms/text-input';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { User } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

function CreateUser() {
    const { data, setData, isDirty, post, reset, hasErrors, errors } = useForm({
        email: '',
        password: '',
        name: '',
        password_confirmation: '',
    } satisfies Omit<User, 'id' | 'created_at' | 'updated_at'> & { password_confirmation: string });
    console.error('errors', errors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/user', {
            onStart: () => {
                console.debug('Enviando datos del formulario:', data);
                toast.info('Enviando formulario...');
            },
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
                <InputWithLabel tabIndex={2} label="Correo *" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputToggleVisibility
                    tabIndex={3}
                    label="Clave *"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputToggleVisibility
                    tabIndex={4}
                    label="Confirmación de clave *"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => {
                        setData('password_confirmation', e.target.value);
                    }}
                />
            </div>
            <div className="mt-8 flex h-fit items-center justify-end gap-x-4">
                <Button variant="destructive" size="sm" className="me-auto bg-destructive/85 text-xs" type="button" onClick={() => reset()}>
                    <RotateCcw />
                    Reiniciar
                </Button>
                <AlertDialogCancel className={buttonVariants({ variant: 'secondary' })} type="button">
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction className={buttonVariants({ variant: 'default' })} type="submit" disabled={!isDirty || hasErrors}>
                    Guardar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default CreateUser;
