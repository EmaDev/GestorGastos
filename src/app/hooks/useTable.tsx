import { useMemo, useState } from 'react'
import { Usuario } from '../../interfaces/Usuario';

interface Props {
    data: Usuario[];
    rowsPerPage: number;
}

export const useTable = ({ data, rowsPerPage}: Props) => {

    const [page, setPage] = useState<number>(1);

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);


    return {pages, page, items, setPage}
}
