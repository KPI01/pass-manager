import { DataTableColumnHeader } from '@/components/data-table/header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types/models';
import { createColumnHelper } from '@tanstack/react-table';
import { Ellipsis, Key, PenBox, Trash } from 'lucide-react';

const userColHelper = createColumnHelper<User>();
export const userColumn = [
    userColHelper.accessor('email', {
        header: ({ column }) => <DataTableColumnHeader title="Correo" column={column} />,
    }),
    userColHelper.accessor('name', {
        header: ({ column }) => <DataTableColumnHeader title="Nombre" column={column} />,
    }),
    userColHelper.display({
        id: 'actions',
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Key />
                        Restablecer contraseña
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PenBox />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/20 focus:text-destructive">
                        <Trash className="text-destructive/75" />
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    }),
];
