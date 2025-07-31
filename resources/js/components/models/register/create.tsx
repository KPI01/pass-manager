import { InputToggleVisibility, InputWithLabel } from '@/components/forms/text-input';
import { TextareaWithLabel } from '@/components/forms/textarea';
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
    const { data, setData, isDirty, hasErrors, post } = useForm({
        description: '',
        login: '',
        password: '',
        password_confirmation: '',
        type: entityType ?? '',
        notes: '',
    } satisfies Omit<Register, 'id' | 'created_at' | 'updated_at' | 'owner'> & { password_confirmation: string });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.debug('sending form...');
        post('/registers', {
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
            <div className="col-span-full flex flex-wrap gap-y-4">
                <div className="flex gap-4">
                    <div className="basis-1/2">
                        <InputToggleVisibility
                            label="Clave *"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <div className="basis-1/2">
                        <InputToggleVisibility
                            label="Confirmación de clave *"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                </div>
                <div className="basis-full">
                    <TextareaWithLabel label="Observaciones" value={data.notes ?? ''} onChange={(e) => setData('notes', e.target.value)} />
                </div>
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
