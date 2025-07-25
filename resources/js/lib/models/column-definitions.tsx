import { DataTableViewOptions } from '@/components/data-table/column-toggle';
import { DataTableColumnHeader } from '@/components/data-table/header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Register, User } from '@/types/models';
import { createColumnHelper } from '@tanstack/react-table';
import { Copy, Ellipsis, Key, PenBox, TextSearch, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { getRegisterPassword } from './register/get-password';

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
        enableHiding: false,
        enableSorting: false,
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

const registerColHelper = createColumnHelper<Register>();
export const registerColumn = (
    selectionHandler: (id: number) => void,
    token: string,
    entity?: 'user' | 'email',
    changers: Record<string, (open: boolean) => void> = {},
) => {
    let type = ['email', 'user'].find((type) => entity === type);
    type = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Login';

    return [
        registerColHelper.accessor('id', {
            id: 'ID',
            header: ({ column }) => <DataTableColumnHeader title="ID" column={column} />,
        }),
        registerColHelper.accessor('description', {
            id: 'Descripción',
            header: ({ column }) => <DataTableColumnHeader title="Descripción" column={column} />,
        }),
        registerColHelper.accessor('login', {
            id: type,
            header: ({ column }) => (
                <DataTableColumnHeader title={entity === 'user' ? 'Usuario' : entity === 'email' ? 'Correo' : 'Login'} column={column} />
            ),
        }),
        registerColHelper.accessor('created_at', {
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
        registerColHelper.display({
            id: 'actions',
            enableHiding: false,
            enableSorting: false,
            header: ({ table }) => <DataTableViewOptions table={table} />,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(row.original.login)
                                    .finally(() => toast.info(`Se ha copiado el ${type.toLowerCase()} al portapapeles`));
                            }}
                        >
                            <Copy className="text-inherit" />
                            Copiar {entity === 'user' ? 'usuario' : 'correo'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                getRegisterPassword(row.original.id, token).then((data) => {
                                    if (data.status === 'error') {
                                        toast.error(data.error);
                                    }

                                    if (data.password)
                                        navigator.clipboard.writeText(data.password).finally(() => {
                                            toast.info('Se ha copiado la clave al portapapeles.');
                                        });
                                });
                            }}
                        >
                            <Copy className="text-inherit" />
                            Copiar clave
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                selectionHandler(row.original.id);
                                changers.setShowAlert(true);
                            }}
                        >
                            <TextSearch />
                            Más detalles
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/20 focus:text-destructive" onClick={() => {
                                selectionHandler(row.original.id);
                                changers.setDeleteAlert(true);
                            }}>
                            <Trash className="text-inherit" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }),
    ];
};
