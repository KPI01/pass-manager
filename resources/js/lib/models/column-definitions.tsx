import { DataTableViewOptions } from '@/components/data-table/column-toggle';
import { DataTableColumnHeader } from '@/components/data-table/header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types/models';
import { createColumnHelper } from '@tanstack/react-table';
import { Ellipsis, Key, PenBox, Trash } from 'lucide-react';

type UserColumnParams = {
    currentUserId?: number;
    selectUser: (id: number) => void;
    resetPasswordAlert: (open: boolean) => void;
    editAlert: (open: boolean) => void;
    deleteAlert: (open: boolean) => void;
};

const userColHelper = createColumnHelper<User>();
export const userColumn = ({ currentUserId, selectUser, resetPasswordAlert, editAlert, deleteAlert }: UserColumnParams) => [
    userColHelper.accessor('email', {
        id: 'Correo',
        header: ({ column }) => <DataTableColumnHeader title="Correo" column={column} />,
    }),
    userColHelper.accessor('name', {
        id: 'Nombre',
        header: ({ column }) => <DataTableColumnHeader title="Nombre" column={column} />,
    }),
    userColHelper.accessor('created_at', {
        id: 'Creación',
        header: ({ column }) => <DataTableColumnHeader title="Fecha de creación" column={column} />,
        cell: ({ getValue }) =>
            new Date(getValue()).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
    }),
    userColHelper.accessor('updated_at', {
        id: 'Actualización',
        header: ({ column }) => <DataTableColumnHeader title="Últ. Actualización" column={column} />,
        cell: ({ getValue }) =>
            new Date(getValue()).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
    }),
    userColHelper.display({
        id: 'actions',
        header: ({ table }) => <DataTableViewOptions table={table} />,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => {
                            selectUser(row.original.id);
                            resetPasswordAlert(true);
                        }}
                    >
                        <Key />
                        Restablecer contraseña
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            selectUser(row.original.id);
                            editAlert(true);
                        }}
                    >
                        <PenBox />
                        Editar
                    </DropdownMenuItem>
                    {row.original.id !== currentUserId && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    selectUser(row.original.id);
                                    deleteAlert(true);
                                }}
                                className="text-destructive focus:bg-destructive/20 focus:text-destructive"
                            >
                                <Trash className="text-destructive/75" />
                                Eliminar
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }),
];
