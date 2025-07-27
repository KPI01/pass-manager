import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import { InputToggleVisibility } from '@/components/forms/text-input';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Opciones de contraseña',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Opciones de contraseña" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Actualizar contraseña"
                        description="Asegúrate de utilizar una contraseña larga y aleatoria para mantener un buen nivel de seguridad"
                    />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <InputToggleVisibility
                            label="Contraseña actual"
                            name="current_password"
                            type="text"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            placeholder="Clave actual"
                        />
                        <InputToggleVisibility
                            label="Nueva contraseña"
                            name="password"
                            type="text"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                        <InputToggleVisibility
                            label="Confirmar contraseña"
                            name="password_confirmation"
                            type="text"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmar contraseña"
                        />

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar contraseña</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardada</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
