import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import { Button } from '@/components/ui/button';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputToggleVisibility } from './forms/text-input';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Eliminar cuenta" description="Elimina tu cuenta y todos sus recursos" />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Advertencia</p>
                    <p className="text-sm">Por favor, ten cuidado porque esta acción no se puede deshacer.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Eliminar cuenta</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>¿Estás seguro de que deseas eliminar tu cuenta?</DialogTitle>
                        <DialogDescription>
                            Una vez que se elimine tu cuenta, todos sus recursos y datos también se eliminarán permanentemente. Por favor, ingresa tu
                            contraseña para confirmar que deseas eliminar tu cuenta de forma permanente.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <InputToggleVisibility
                                label="Contraseña"
                                type="text"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="******"
                            />

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancelar
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Eliminar cuenta</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
