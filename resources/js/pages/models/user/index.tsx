import { DataTable } from '@/components/data-table/table';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { userColumn } from '@/lib/models/column-definitions';
import { BreadcrumbItem, SharedData } from '@/types';
import { User } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateUser from './create';
import DeleteUser from './delete';
import ResetUserPassword from './reset-password';
import UnauthorizedForUser from './unauthorized';
import UpdateUser from './update';

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/user',
    },
];

function Index({ users }: Props) {
    const [selectedUser, setSelectedUser] = useState<User>(users[0]);
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [resetPasswordAlertOpen, setResetPasswordAlertOpen] = useState(false);
    const [editAlertOpen, setEditAlertOpen] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const { auth } = usePage<SharedData>().props;
    console.debug('auth', auth);

    const handleSelectedUser = (id: number) => {
        const user = users.find((user) => user.id === id);
        if (user) setSelectedUser(user);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="my-4 grid px-4">
                {auth.can.user.create && (
                    <div className="m-1 flex justify-end">
                        <Button className="mb-4" type="button" onClick={() => setCreateUserOpen(true)}>
                            <Plus />
                            Nuevo usuario
                        </Button>
                    </div>
                )}
                <DataTable
                    columns={
                        userColumn({
                            currentUserId: auth.user.id,
                            selectUser: handleSelectedUser,
                            resetPasswordAlert: setResetPasswordAlertOpen,
                            editAlert: setEditAlertOpen,
                            deleteAlert: setDeleteAlertOpen,
                        }) as ColumnDef<User>[]
                    }
                    data={users}
                />
            </div>

            <AlertDialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle>Datos del Nuevo Usuario</AlertDialogTitle>
                    <CreateUser />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={resetPasswordAlertOpen} onOpenChange={setResetPasswordAlertOpen}>
                <AlertDialogContent>
                    {auth.can.user.update ? (
                        <>
                            <AlertDialogTitle>Restablecer Contraseña</AlertDialogTitle>
                            <ResetUserPassword user={selectedUser} />
                        </>
                    ) : (
                        <UnauthorizedForUser closeAlert={() => setResetPasswordAlertOpen(false)}>
                            <p>No tienes permisos para restablecer la contraseña de este usuario.</p>
                        </UnauthorizedForUser>
                    )}
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={editAlertOpen} onOpenChange={setEditAlertOpen}>
                <AlertDialogContent>
                    {auth.can.user.update ? (
                        <>
                            <AlertDialogTitle>Actualizar información de usuario</AlertDialogTitle>
                            <UpdateUser user={selectedUser} />
                        </>
                    ) : (
                        <UnauthorizedForUser closeAlert={() => setEditAlertOpen(false)}>
                            <p>No tienes permisos para restablecer la contraseña de este usuario.</p>
                        </UnauthorizedForUser>
                    )}
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
                <AlertDialogContent>
                    {auth.can.user.delete ? (
                        <DeleteUser user={selectedUser} />
                    ) : (
                        <UnauthorizedForUser closeAlert={() => setDeleteAlertOpen(false)}>
                            <p>No tienes permisos para eliminar este usuario.</p>
                        </UnauthorizedForUser>
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

export default Index;
