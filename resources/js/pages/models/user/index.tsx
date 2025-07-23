import { DataTable } from '@/components/data-table/table';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { userColumn } from '@/lib/models/column-definitions';
import { BreadcrumbItem, SharedData } from '@/types';
import { User } from '@/types/models';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import CreateUser from './create';

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
    console.debug('users', users);

    const { auth } = usePage<SharedData>().props;
    console.debug('auth', auth);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="my-4 grid px-4">
                {auth.can.user.create && (
                    <div className="m-1 flex justify-end">
                        <AlertDialog>
                            <AlertDialogTrigger className={buttonVariants({ variant: 'default' })}>
                                <Plus />
                                Nuevo usuario
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogTitle>Datos del Nuevo Usuario</AlertDialogTitle>
                                <CreateUser />
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
                {/* @ts-ignore */}
                <DataTable columns={userColumn} data={users} />
            </div>
        </AppLayout>
    );
}

export default Index;
