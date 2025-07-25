import { InputWithLabel } from '@/components/forms/text-input';
import { TextareaWithLabel } from '@/components/forms/textarea';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SharedData } from '@/types';
import { Register } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Check, Clipboard } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import ShowRegisterPassword from './show-password';

interface Props {
    register: Register;
    can: SharedData['auth']['can'];
}

function ShowRegister({ register, can }: Props) {
    console.debug('register:', register);

    const { data, setData, isDirty, patch, hasErrors } = useForm({
        description: register.description,
        login: register.login,
        notes: register.notes,
    } satisfies Pick<Register, 'description' | 'login' | 'notes'>);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        patch(`/registers/${register.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${register.type === 'user' ? 'Usuario' : 'Correo'} actualizado`);
            },
        });
    };

    const copyLoginToClipboard = () => {
        navigator.clipboard.writeText(data.login);
        toast.info(`${register.type === 'user' ? 'Usuario' : 'Correo'} copiado al portapapeles`);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <InputWithLabel
                    label="Descripción"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={!can.register.update}
                />
                <div className="flex items-end gap-2">
                    <div className="basis-full">
                        <InputWithLabel
                            label={register.type === 'user' ? 'Nombre de usuario' : 'Correo electrónico'}
                            value={data.login}
                            onChange={(e) => setData('login', e.target.value)}
                            disabled={!can.register.update}
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger
                            type="button"
                            className={buttonVariants({ size: 'icon', variant: 'outline' })}
                            onClick={() => copyLoginToClipboard()}
                        >
                            <Clipboard />
                        </TooltipTrigger>
                        <TooltipContent>Copiar</TooltipContent>
                    </Tooltip>
                </div>
                <TextareaWithLabel
                    label="Observaciones"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    disabled={!can.register.update}
                />
                <Separator />
                <h3 className="text-lg font-bold">Clave</h3>
                <ShowRegisterPassword register={register} can={can} />
            </form>
            <div className="flex items-center justify-end gap-2">
                <AlertDialogCancel type="button">Cerrar</AlertDialogCancel>
                {isDirty && !hasErrors && (
                    <AlertDialogAction type="submit">
                        <Check />
                        Guardar
                    </AlertDialogAction>
                )}
            </div>
        </>
    );
}

export default ShowRegister;
