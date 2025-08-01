import { DataTable } from '@/components/data-table/table';
import AppLayout from '@/layouts/app-layout';
import { logsColumns } from '@/lib/models/column-definitions';
import { BreadcrumbItem } from '@/types';
import { Change } from '@/types/models';

interface Props {
    changes: Change[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logs',
        href: '/logs',
    },
];

function IndexChanges({ changes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="grid p-6">
                <DataTable columns={logsColumns} data={changes} />
            </div>
        </AppLayout>
    );
}

export default IndexChanges;
