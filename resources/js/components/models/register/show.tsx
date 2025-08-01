import { InputWithLabel } from '@/components/forms/text-input';
import { TextareaWithLabel } from '@/components/forms/textarea';
import { AlertDialogAction } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import checkCanUpdateRegister from '@/lib/models/register/check-can-update';
import { SharedData } from '@/types';
import { Register } from '@/types/models';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Clipboard, LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    register: Register;
}

function ShowRegister({ register }: Props) {
    const { token } = usePage<SharedData>().props;

    let [canEdit, setCanEdit] = useState(false);
    useEffect(() => {
        checkCanUpdateRegister(register.id, token).then((data) => {
            if (data.canEdit) setCanEdit(data.canEdit);
            return;
        });
    }, []);
    console.debug('canEdit', canEdit);

    const { data, setData, isDirty, patch, hasErrors, processing } = useForm({
        description: register.description,
        login: register.login,
        notes: register.notes,
    } satisfies Pick<Register, 'description' | 'login' | 'notes'>);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        patch(`/register/${register.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Registro actualizado correctamente.');
            },
        });
    };

    const copyLoginToClipboard = () => {
        navigator.clipboard.writeText(data.login);
        toast.info(`${register.type === 'user' ? 'Usuario' : 'Correo'} copiado al portapapeles`);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <InputWithLabel
                label="Descripción"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                disabled={!canEdit}
            />
            <div className="flex items-end gap-2">
                <div className="basis-full">
                    <InputWithLabel
                        label={register.type === 'user' ? 'Nombre de usuario' : 'Correo electrónico'}
                        value={data.login}
                        onChange={(e) => setData('login', e.target.value)}
                        disabled={!canEdit}
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
                value={data.notes ?? ''}
                onChange={(e) => setData('notes', e.target.value)}
                disabled={!canEdit}
            />
            <div className="flex items-center justify-end gap-2">
                {isDirty && !hasErrors && (
                    <AlertDialogAction type="submit">
                        {processing ? (
                            <LoaderCircle />
                        ) : (
                            <>
                                <Check />
                                Guardar
                            </>
                        )}
                    </AlertDialogAction>
                )}
            </div>
        </form>
    );
}

export default ShowRegister;
