import { Input } from '@/components/forms/text-input';
import { AlertDialogAction } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import checkCanUpdateRegister from '@/lib/models/register/check-can-update';
import { getRegisterPassword } from '@/lib/models/register/get-password';
import { SharedData } from '@/types';
import { Register } from '@/types/models';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Clipboard, Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    register: Register;
}

function ShowRegisterPassword({ register }: Props) {
    const { token } = usePage<SharedData>().props;

    let [canEdit, setCanEdit] = useState(false);
    useEffect(() => {
        checkCanUpdateRegister(register.id, token).then((data) => {
            if (data.canEdit) setCanEdit(data.canEdit);
            return;
        });
    }, []);

    const [revealed, setRevealed] = useState(false);
    const [password, setPassword] = useState('');
    const { setData, patch, isDirty, processing } = useForm({
        password: '',
    });

    const togglePassword = () => {
        if (revealed) {
            setRevealed(false);
            return;
        }

        if (password) {
            setRevealed(true);
            return;
        }

        getRegisterPassword(register.id, token).then((value) => {
            if (value.status === 'error') {
                toast.error('No se ha podido revelar la clave', { description: value.error });
                return;
            }

            if (value.password) {
                setPassword(value.password);
                setRevealed(true);
            }
        });
    };

    const copyPassword = () => {
        if (!revealed && password === '') {
            getRegisterPassword(register.id, token).then((value) => {
                if (value.status === 'error') {
                    toast.error('No se ha podido revelar la clave', { description: value.error });
                    return;
                }

                if (value.password) {
                    navigator.clipboard.writeText(value.password);
                    toast.info('Se ha copiado la clave en el portapapeles.');
                }
            });
        }

        if (password !== '') {
            navigator.clipboard.writeText(password);
            toast.info('Se ha copiado la clave en el portapapeles.');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        patch(`/register/${register.id}`, {
            onSuccess: () => {
                toast.success('La clave se ha actualizado correctamente.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
                className="select-none"
                placeholder="********"
                name="password"
                type={revealed ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setData('password', e.target.value);
                }}
                disabled={!(canEdit && revealed)}
            />
            <Tooltip>
                <TooltipTrigger type="button" onClick={() => togglePassword()} className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                    {!revealed ? <EyeClosed /> : <Eye />}
                </TooltipTrigger>
                <TooltipContent>{revealed ? 'Ocultar' : 'Revelar'}</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger type="button" className={buttonVariants({ variant: 'outline', size: 'icon' })} onClick={() => copyPassword()}>
                    <Clipboard />
                </TooltipTrigger>{' '}
                <TooltipContent>Copiar</TooltipContent>
            </Tooltip>
            {isDirty && (
                <Tooltip>
                    <AlertDialogAction asChild>
                        <TooltipTrigger type="submit" className={buttonVariants({ variant: 'default', size: 'icon' })}>
                            {processing ? <LoaderCircle className="animate-spin" /> : <Check />}
                        </TooltipTrigger>
                    </AlertDialogAction>
                    <TooltipContent>Guardar cambios</TooltipContent>
                </Tooltip>
            )}
        </form>
    );
}

export default ShowRegisterPassword;
