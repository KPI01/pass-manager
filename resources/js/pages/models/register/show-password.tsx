import { Input } from '@/components/forms/text-input';
import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getRegisterPassword } from '@/lib/models/register/get-password';
import { SharedData } from '@/types';
import { Register } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { Clipboard, Eye, EyeClosed, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    register: Register;
    can: SharedData['auth']['can'];
}

function ShowRegisterPassword({ register, can }: Props) {
    const props = usePage<SharedData>().props;
    console.debug('props:', props);

    const [revealed, setRevealed] = useState(false);
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        if (revealed) {
            setRevealed(false);
            setPassword('');
            return;
        }

        getRegisterPassword(register.id, props.token).then((value) => {
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
        if (!revealed) {
            getRegisterPassword(register.id, props.token).then((value) => {
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
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
                <Input
                    className="select-none"
                    placeholder="********"
                    name="password"
                    type={revealed ? 'text' : 'password'}
                    value={password}
                    disabled
                />
                <Tooltip>
                    <TooltipTrigger type="button" onClick={() => togglePassword()} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                        {!revealed ? <EyeClosed /> : <Eye />}
                    </TooltipTrigger>
                    <TooltipContent>{revealed ? 'Ocultar' : 'Revelar'}</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger type="button" className={buttonVariants({ variant: 'outline', size: 'sm' })} onClick={() => copyPassword()}>
                        <Clipboard />
                    </TooltipTrigger>{' '}
                    <TooltipContent>Copiar</TooltipContent>
                </Tooltip>
                {can.register.update && (
                    <Popover>
                        <Tooltip>
                            <PopoverTrigger asChild type="button" className={buttonVariants({ variant: 'default', size: 'sm' })}>
                                <TooltipTrigger>
                                    <RotateCcw />
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <PopoverContent side="right">Formulario para reestablecer la clave.</PopoverContent>
                        </Tooltip>
                    </Popover>
                )}
            </div>
        </div>
    );
}

export default ShowRegisterPassword;
