import { DataTable } from '@/components/data-table/table';
import CreateRegister from '@/components/models/register/create';
import DeleteRegister from '@/components/models/register/delete';
import ShowRegister from '@/components/models/register/show';
import ShowHistory from '@/components/models/register/show-history';
import ShowRegisterPassword from '@/components/models/register/show-password';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { registerColumn } from '@/lib/models/column-definitions';
import { BreadcrumbItem, SharedData } from '@/types';
import { Register } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ListPlus, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
    registers: Register[];
    entityType?: 'user' | 'email';
}

function IndexRegister({ registers, entityType }: Props) {
    const { token } = usePage<SharedData>().props;

    const [selectedRegister, setselectedRegister] = useState<Register>();
    const handleRegisterSelection = (id: number) => {
        const selectedRegister = registers.find((register) => register.id === id);
        if (selectedRegister) setselectedRegister(selectedRegister);
    };

    const [createAlert, setCreateAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [historyAlert, setHistoryAlert] = useState(false);

    let entity: string | undefined = ['email', 'user'].find((type) => entityType === type);
    let breadcrumbs: BreadcrumbItem[] = [{ title: 'Registros', href: `/registers` }];

    if (entity) {
        entity = entity === 'user' ? 'Usuarios' : 'Correos';
        breadcrumbs.push({ title: entity, href: `/register?entity=${entityType}` });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="grid p-4">
                <Button type="button" className="my-4 ms-auto" onClick={() => setCreateAlert(true)}>
                    <ListPlus /> Agregar registro
                </Button>
                <DataTable
                    columns={
                        registerColumn({
                            selectionHandler: handleRegisterSelection,
                            token,
                            entity: entityType,
                            actions: { setShowAlert, setDeleteAlert, setHistoryAlert },
                        }) as ColumnDef<Register>[]
                    }
                    data={registers}
                />
            </div>

            <AlertDialog open={createAlert} onOpenChange={setCreateAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ingresa los datos para el nuevo registro</AlertDialogTitle>
                    </AlertDialogHeader>
                    <CreateRegister entityType={entityType} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader className="flex-row justify-between">
                        <AlertDialogTitle>Registro detallado</AlertDialogTitle>
                        <AlertDialogCancel
                            type="button"
                            className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'border-none shadow-none' })}
                        >
                            <X />
                        </AlertDialogCancel>
                    </AlertDialogHeader>
                    <ShowRegister register={selectedRegister!} />
                    <Separator />
                    <h3 className="text-lg font-bold">Clave</h3>
                    <ShowRegisterPassword register={selectedRegister!} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={historyAlert} onOpenChange={setHistoryAlert}>
                <AlertDialogContent className="!max-w-4xl">
                    <AlertDialogHeader className="flex-row justify-between">
                        <AlertDialogTitle>Historial de cambios</AlertDialogTitle>
                        <AlertDialogCancel type="button" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                            <X />
                        </AlertDialogCancel>
                    </AlertDialogHeader>
                    <ShowHistory registerId={selectedRegister?.id!} token={token} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogTitle className="text-xl font-bold">Confirma para eliminar</AlertDialogTitle>
                    <DeleteRegister register={selectedRegister!} />
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

export default IndexRegister;
