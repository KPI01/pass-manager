import { DataTable } from '@/components/data-table/table';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { userColumn } from '@/lib/models/column-definitions';
import { BreadcrumbItem, SharedData } from '@/types';
import { User } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateUser from '../../../components/models/user/create';
import DeleteUser from '../../../components/models/user/delete';
import ResetUserPassword from '../../../components/models/user/reset-password';
import UpdateUser from '../../../components/models/user/update';

interface Props {
    users: User[];
    aux: { roles: Record<string, string> };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/user',
    },
];

function Index({ users, aux }: Props) {
    console.debug('aux', aux);

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
                    columns={userColumn({
                        currentUserId: auth.user.id,
                        selectUser: handleSelectedUser,
                        actions: { resetPasswordAlert: setResetPasswordAlertOpen, editAlert: setEditAlertOpen, deleteAlert: setDeleteAlertOpen },
                    })}
                    data={users}
                />
            </div>

            <AlertDialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle>Datos del Nuevo Usuario</AlertDialogTitle>
                    <CreateUser roles={aux.roles} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={resetPasswordAlertOpen} onOpenChange={setResetPasswordAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle>Restablecer Contraseña</AlertDialogTitle>
                    <ResetUserPassword user={selectedUser} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={editAlertOpen} onOpenChange={setEditAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogTitle>Actualizar información de usuario</AlertDialogTitle>
                    <UpdateUser user={selectedUser} />
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
                <AlertDialogContent>
                    <DeleteUser user={selectedUser} />
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}

export default Index;
