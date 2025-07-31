import { DataTableViewOptions } from '@/components/data-table/column-toggle';
import { DataTableColumnHeader } from '@/components/data-table/header';
import { DataTable } from '@/components/data-table/table';
import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Change, Register, User } from '@/types/models';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Copy, Ellipsis, History, Key, PenBox, TextSearch, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { transformDateString } from '../utils';
import { getRegisterPassword } from './register/get-password';

type UserColumnParams = {
    currentUserId?: number;
    selectUser: (id: number) => void;
    actions: Record<string, (open: boolean) => void>;
};

const userColHelper = createColumnHelper<User>();
export const userColumn = ({ currentUserId, selectUser, actions }: UserColumnParams) => [
    userColHelper.accessor('email', {
        id: 'Correo',
        header: ({ column }) => <DataTableColumnHeader title="Correo" column={column} />,
    }),
    userColHelper.accessor('name', {
        id: 'Nombre',
        header: ({ column }) => <DataTableColumnHeader title="Nombre" column={column} />,
    }),
    userColHelper.accessor('role.name', {
        id: 'Rol',
        header: ({ column }) => <DataTableColumnHeader title="Rol" column={column} />,
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
                            actions.resetPasswordAlert(true);
                        }}
                    >
                        <Key />
                        Restablecer contraseña
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            selectUser(row.original.id);
                            actions.editAlert(true);
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
                                    actions.deleteAlert(true);
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

type RegisterColumnParams = {
    selectionHandler: (id: number) => void;
    token: string;
    entity?: 'user' | 'email';
    actions: Record<string, (open: boolean) => void>;
};
const registerColHelper = createColumnHelper<Register>();
export const registerColumn = ({ selectionHandler, token, entity, actions }: RegisterColumnParams) => {
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
            cell: ({ getValue }) => transformDateString(getValue()),
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
                                actions.setShowAlert(true);
                            }}
                        >
                            <TextSearch />
                            Más detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                selectionHandler(row.original.id);
                                actions.setHistoryAlert(true);
                            }}
                        >
                            <History className="text-inherit" /> Cambios
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/20 focus:text-destructive"
                            onClick={() => {
                                selectionHandler(row.original.id);
                                actions.setDeleteAlert(true);
                            }}
                        >
                            <Trash className="text-inherit" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }),
    ];
};

type ChangeDetail = {
    attribute: string;
    value: unknown;
};
let changeDetailColumns: ColumnDef<ChangeDetail>[] = [
    {
        id: 'Atributo',
        header: 'Atributo',
        accessorKey: 'attribute',
    },
    {
        id: 'Valor',
        header: 'Valor',
        accessorKey: 'value',
        cell: ({ getValue }) => String(getValue()),
    },
];
const registerChangesHelper = createColumnHelper<Change>();
export const registerChangeColumns = [
    registerChangesHelper.accessor('id', {
        id: 'Nro.',
        header: 'ID',
        enableHiding: false,
    }),
    registerChangesHelper.accessor('created_at', {
        id: 'Realizado',
        header: ({ column }) => <DataTableColumnHeader title="Fecha" column={column} />,
        cell: ({ getValue }) => transformDateString(getValue()),
        enableHiding: false,
    }),
    registerChangesHelper.accessor('action', {
        id: 'Acción',
        header: ({ column }) => <DataTableColumnHeader title="Acción" column={column} />,
        cell: ({ row }) => (row.original.action === 'creation' ? 'Creación' : 'Modificación'),
        enableHiding: false,
    }),
    registerChangesHelper.accessor('made_by.email', {
        id: 'Usuario',
        header: 'Correo',
        enableHiding: false,
    }),
    registerChangesHelper.accessor('old', {
        id: 'Anterior',
        header: 'Valor anterior',
        enableHiding: false,
        cell: ({ row }) => {
            const { original } = row;
            let details: ChangeDetail[] = [];

            if (!original.old) return undefined;

            const val = JSON.parse(original.old);
            console.debug('val', val);
            const keys = Object.keys(val);

            keys.forEach((key) => {
                console.debug('key', key);
                console.debug('val[key]', val[key]);

                details.push({
                    attribute: key
                        .replaceAll('_', ' ')
                        .split(' ')
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(' '),
                    value: val[key],
                });
            });

            return (
                <Dialog>
                    <DialogTrigger className={buttonVariants({ variant: 'outline', size: 'sm', className: 'text-xs' })}>Ver</DialogTrigger>
                    <DialogContent className="!min-h-fit !max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Valores anteriores</DialogTitle>
                        </DialogHeader>
                        <DataTable columns={changeDetailColumns} data={details} disableFooter />
                    </DialogContent>
                </Dialog>
            );
        },
    }),
    registerChangesHelper.accessor('new', {
        id: 'Nuevo',
        header: 'Valor nuevo',
        enableHiding: false,
        cell: ({ row }) => {
            const { original } = row;
            let details: ChangeDetail[] = [];

            if (!original.new) return undefined;

            const val = JSON.parse(original.new);
            const keys = Object.keys(val);

            keys.forEach((key) => {
                details.push({
                    attribute: key
                        .replaceAll('_', ' ')
                        .split(' ')
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(' '),
                    value: val[key],
                });
            });
            return (
                <Dialog>
                    <DialogTrigger className={buttonVariants({ variant: 'outline', size: 'sm', className: 'text-xs' })}>Ver</DialogTrigger>
                    <DialogContent className="!max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Nuevos valores</DialogTitle>
                        </DialogHeader>
                        <DataTable columns={changeDetailColumns} data={details} disableFooter />
                    </DialogContent>
                </Dialog>
            );
        },
    }),
] as ColumnDef<Change>[];
