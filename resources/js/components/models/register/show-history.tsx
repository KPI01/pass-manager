import { DataTable } from '@/components/data-table/table';
import { registerChangeColumns } from '@/lib/models/column-definitions';
import { getRegisterChanges } from '@/lib/models/register/get-changes';
import { Change } from '@/types/models';
import { useEffect, useState } from 'react';

interface Props {
    registerId: number;
    token: string;
}

function ShowHistory({ registerId, token }: Props) {
    const [history, setHistory] = useState<Change[]>([]);
    console.debug('history', history);

    useEffect(() => {
        getRegisterChanges({ registerId, token }).then((data) => {
            if (data.status === 'error') {
                console.error(data.error);
                return;
            }

            setHistory(data.history!);
        });
    }, []);

    return <DataTable columns={registerChangeColumns} data={history} disablePageSize />;
}

export default ShowHistory;
