import { DataTable } from '@/components/data-table/table';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { registerColumn } from '@/lib/models/column-definitions';
import { BreadcrumbItem, SharedData } from '@/types';
import { Register } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ListPlus } from 'lucide-react';
import { useState } from 'react';
import CreateRegister from './create';
import DeleteRegister from './delete';
import ShowRegister from './show';

interface Props {
    registers: Register[];
    entityType?: 'user' | 'email';
}

function IndexRegister({ registers, entityType }: Props) {
    const { auth, token } = usePage<SharedData>().props;

    const [selectedRegister, setselectedRegister] = useState<Register>();
    const handleRegisterSelection = (id: number) => {
        const selectedRegister = registers.find((register) => register.id === id);
        if (selectedRegister) setselectedRegister(selectedRegister);
    };

    const [createAlert, setCreateAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

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
                    columns={registerColumn(handleRegisterSelection, token, entityType, { setShowAlert, setDeleteAlert }) as ColumnDef<Register>[]}
                    data={registers}
                />
            </div>

            <AlertDialog open={createAlert} onOpenChange={setCreateAlert}>
                <AlertDialogContent>
                    <AlertDialogTitle>Ingresa los datos para el nuevo registro</AlertDialogTitle>
                    <CreateRegister entityType={entityType} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogTitle className="text-xl font-bold">Registro detallado</AlertDialogTitle>
                    <ShowRegister can={auth.can} register={selectedRegister!} />
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
