import { InputToggleVisibility, InputWithLabel } from '@/components/forms/text-input';
import { TextareaWithLabel } from '@/components/forms/textarea';
import PasswordGenerator from '@/components/password-generator';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Register } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface Props {
    entityType?: 'user' | 'email';
}

function CreateRegister({ entityType }: Props) {
    const { data, setData, isDirty, hasErrors, post, errors } = useForm({
        description: '',
        login: '',
        password: '',
        type: entityType ?? '',
        notes: '',
    } satisfies Omit<Register, 'id' | 'created_at' | 'updated_at' | 'owner'>);
    if (errors) console.error(errors);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.info('sending form...');
        post('/register', {
            preserveState: true,
            onSuccess: () => toast.success('Registro creado!'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_70%]">
            <div className="col-span-full">
                <InputWithLabel
                    label="Descripción *"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <div className="grid h-fit items-center gap-3">
                <Label>Tipo de registro *</Label>
                <Select value={data.type} onValueChange={(e) => setData('type', e)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="email">Correo</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <InputWithLabel
                label="Login *"
                name="login"
                type={data.type === 'email' ? 'email' : 'text'}
                value={data.login}
                onChange={(e) => setData('login', e.target.value)}
            />
            <div className="col-span-full grid gap-y-4">
                <div className="flex items-end gap-x-4">
                    <div className="basis-full">
                        <InputToggleVisibility
                            label="Clave *"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <PasswordGenerator onValueChange={(v) => setData('password', v)} />
                </div>

                <TextareaWithLabel label="Observaciones" value={data.notes ?? ''} onChange={(e) => setData('notes', e.target.value)} />
            </div>
            <div className="col-span-full flex justify-end gap-4">
                <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!isDirty || hasErrors}>
                    Guardar
                </AlertDialogAction>
            </div>
        </form>
    );
}

export default CreateRegister;
